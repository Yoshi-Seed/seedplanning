-- Users table
CREATE TABLE IF NOT EXISTS users (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT NOT NULL,
  email    TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  birthday TEXT NOT NULL
);

-- 10 dummy records
INSERT INTO users (name, email, password, birthday) VALUES
  ('山田 太郎',     'yamada.taro@example.com',    'Pass1234!',   '1985-04-15'),
  ('鈴木 花子',     'suzuki.hanako@example.com',  'Hanako@99',   '1990-07-22'),
  ('田中 一郎',     'tanaka.ichiro@example.com',  'T4naka#56',   '1978-11-03'),
  ('佐藤 美咲',     'sato.misaki@example.com',    'Misaki!789',  '1995-02-28'),
  ('高橋 健太',     'takahashi.kenta@example.com','K3nta$21',    '1988-09-10'),
  ('伊藤 さくら',   'ito.sakura@example.com',     'S4kura@44',   '1993-06-05'),
  ('渡辺 大輔',     'watanabe.daisuke@example.com','D@isuke77',  '1982-12-19'),
  ('中村 あかね',   'nakamura.akane@example.com', 'Ak4ne#333',   '1997-03-14'),
  ('小林 翔太',     'kobayashi.shota@example.com','Sh0ta!55',    '1975-08-30'),
  ('加藤 ゆり',     'kato.yuri@example.com',      'Yuri@2024',   '2000-01-07');
