CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT UNIQUE,
  bio TEXT,
  join_date DATE DEFAULT (CURRENT_DATE)
)

CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  clerk_id TEXT REFERENCES users(clerk_id) ON DELETE CASCADE,
  post TEXT,
  posted_at TIMESTAMP DEFAULT NOW()
)
CREATE TABLE IF NOT EXISTS likes(
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  likes INTEGER DEFAULT 0
)

CREATE TABLE IF NOT EXISTS follows(
  following_user_clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  followed_user_clerk_id TEXT NOT NULL REFERENCES users(clerk_id) ON DELETE CASCADE,
  PRIMARY KEY (following_user_clerk_id, followed_user_clerk_id)
)

CREATE TABLE IF NOT EXISTS comments(
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  username TEXT,
  comment TEXT
)

CREATE TABLE IF NOT EXISTS user_liked_posts(
  clerk_id TEXT REFERENCES users(clerk_id) ON DELETE CASCADE,
  likes_id INTEGER REFERENCES likes(id) ON DELETE CASCADE,
  PRIMARY KEY (clerk_id, likes_id)
)
DELETE FROM users WHERE clerk_id='user_2nyzOQaJVGUCAYZsJBnoAeNoPBY';
INSERT INTO posts (clerk_id, post) VALUES 
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Excited to start a new project today! 🎉 #NewBeginnings #Motivation'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Can’t believe how fast this year is going by! #TimeFlies #Reflection'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Just finished a great book on productivity. Highly recommend it! 📖 #SelfImprovement'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Coffee first, focus second! ☕️ #MondayMood #CoffeeLove'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Feeling grateful for the little things today. #Gratitude #Mindfulness'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Had an amazing weekend with friends. Good company is everything! 🥂 #WeekendVibes #Friendship'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'What’s everyone listening to lately? Looking for new music recommendations! 🎶 #MusicLovers'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Trying a new recipe tonight—wish me luck! 🍲 #CookingAdventures'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Some days you just need to take a deep breath and keep going 💪 #StayStrong #Resilience'),
('user_2o1j8xv22Nf8U2Y1fRRpBEx1643', 'Anyone else find it hard to stay off their phone? #DigitalDetox needed! 📱');

UPDATE users SET bio='That is the best' WHERE clerk_id='user_2nyziNjviIetmZWeGzV584QiIOQ';

SELECT posts.id AS id, posts.clerk_id AS clerk_id, posts.post AS post, posts.posted_at AS posted_at FROM posts JOIN likes ON likes.post_id = posts.id JOIN user_liked_posts ON user_liked_posts.likes_id = likes.id WHERE user_liked_posts.clerk_id='user_2o2LxXTnm43gkRwN9SHYStk4eMM';