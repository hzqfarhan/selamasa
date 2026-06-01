-- ============================================================
-- SelaMasa — Supabase SQL Schema
-- Run this entire script in Supabase > SQL Editor > New query
-- ============================================================


-- ─── 1. TABLES ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS events (
  id               TEXT PRIMARY KEY,          -- slug, e.g. "mim-azhad-2026"
  bride            TEXT NOT NULL,
  groom            TEXT NOT NULL,
  event_date       TIMESTAMPTZ,
  location         TEXT,
  type             TEXT NOT NULL DEFAULT 'wedding',  -- 'wedding' | 'engagement'
  cover_photo_url  TEXT,
  welcome_note     TEXT,
  package          TEXT NOT NULL DEFAULT 'basic',    -- 'basic' | 'premium'
  features         JSONB NOT NULL DEFAULT '{"boomerang":false,"voice":false,"notes":false,"filters":false}',
  allowed_filters  TEXT[] DEFAULT ARRAY['none'],
  filter_text      JSONB DEFAULT '{"watermark":"","tagline":""}',
  text_style       JSONB DEFAULT '{"position":"bottom","size":"sm","font":"playfair","color":"#ffffff","showName":true}',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS memories (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id        TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  type            TEXT NOT NULL,               -- 'photo' | 'video' | 'boomerang' | 'voice' | 'message'
  guest_name      TEXT NOT NULL DEFAULT 'Guest',
  file_url        TEXT,
  caption         TEXT,
  selected_filter TEXT DEFAULT 'none',
  likes           INTEGER NOT NULL DEFAULT 0,
  width           INTEGER,
  height          INTEGER,
  uploaded_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Fast lookup: event + date descending (used by gallery queries)
CREATE INDEX IF NOT EXISTS idx_memories_event_date ON memories(event_id, uploaded_at DESC);


-- ─── 2. ATOMIC LIKE INCREMENT (RPC) ──────────────────────────────────────────
-- Called by likeMemory() in src/lib/db.ts

CREATE OR REPLACE FUNCTION increment_likes(memory_id UUID)
RETURNS VOID
LANGUAGE sql
AS $$
  UPDATE memories SET likes = likes + 1 WHERE id = memory_id;
$$;


-- ─── 3. ROW LEVEL SECURITY ────────────────────────────────────────────────────

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- events: anyone can read, only authenticated users (admin) can write
CREATE POLICY "Public read events"    ON events FOR SELECT USING (true);
CREATE POLICY "Auth insert events"    ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update events"    ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete events"    ON events FOR DELETE USING (auth.role() = 'authenticated');

-- memories: anyone can read and insert (guests upload), auth needed for update (likes via RPC bypasses this)
CREATE POLICY "Public read memories"   ON memories FOR SELECT USING (true);
CREATE POLICY "Public insert memories" ON memories FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update likes"    ON memories FOR UPDATE USING (true);


-- ─── 4. STORAGE BUCKET ────────────────────────────────────────────────────────
-- You can also create this in: Supabase Dashboard > Storage > New Bucket
-- Name: "memories", Public: ON

INSERT INTO storage.buckets (id, name, public)
VALUES ('memories', 'memories', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public upload to memories"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'memories');

CREATE POLICY "Public read from memories"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'memories');

CREATE POLICY "Auth delete from memories"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'memories' AND auth.role() = 'authenticated');


-- ─── 5. SAMPLE EVENT (optional, for testing) ─────────────────────────────────

INSERT INTO events (id, bride, groom, event_date, location, type, package, features, allowed_filters, welcome_note)
VALUES (
  'nureen-nizam-2026',
  'Nureen',
  'Nizam',
  '2026-06-01T10:00:00Z',
  'Kuala Lumpur',
  'engagement',
  'premium',
  '{"boomerang":true,"voice":true,"notes":true,"filters":true}',
  ARRAY['none','floral','gold','vintage','romantic'],
  'Welcome to our special day! Capture your memories with us.'
)
ON CONFLICT (id) DO NOTHING;
