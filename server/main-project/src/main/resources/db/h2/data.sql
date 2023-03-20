-- 초기 회원 15명
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member1', 'member1@example.com', 'password1!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member2', 'member2@example.com', 'password2!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member3', 'member3@example.com', 'password3!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member4', 'member4@example.com', 'password4!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member5', 'member5@example.com', 'password5!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member6', 'member6@example.com', 'password6!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member7', 'member7@example.com', 'password7!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member8', 'member8@example.com', 'password8!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member9', 'member9@example.com', 'password9!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member10', 'member10@example.com', 'password10!', 'MEMBER_ACTIVE', 'STONE_HAMMER');

INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member11', 'member11@example.com', 'password11!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member12', 'member12@example.com', 'password12!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member13', 'member13@example.com', 'password13!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member14', 'member14@example.com', 'password14!', 'MEMBER_ACTIVE', 'STONE_HAMMER');
INSERT INTO member (nickname, email, password, member_status, hammer_tier) VALUES ('member15', 'member15@example.com', 'password15!', 'MEMBER_ACTIVE', 'STONE_HAMMER');

-- 초기 질문 30개
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 1', 'Question 1 content', 1, 'QUESTION_REQUEST', 'EXERCISE', 1);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 2', 'Question 2 content', 2, 'QUESTION_REQUEST', 'WAKE_UP', 2);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 3', 'Question 3 content', 3, 'QUESTION_REQUEST', 'STUDY', 3);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 4', 'Question 4 content', 4, 'QUESTION_REQUEST', 'ETC', 4);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 5', 'Question 5 content', 5, 'QUESTION_REQUEST', 'EXERCISE', 5);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 6', 'Question 6 content', 6, 'QUESTION_REQUEST', 'EXERCISE', 6);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 7', 'Question 7 content', 7, 'QUESTION_REQUEST', 'WAKE_UP', 7);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 8', 'Question 8 content', 8, 'QUESTION_REQUEST', 'STUDY', 8);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 9', 'Question 9 content', 9, 'QUESTION_REQUEST', 'ETC', 9);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 10', 'Question 10 content', 10, 'QUESTION_REQUEST', 'EXERCISE', 10);

INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 11', 'Question 11 content', 10, 'QUESTION_REQUEST', 'WAKE_UP', 11);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 12', 'Question 12 content', 9, 'QUESTION_REQUEST', 'STUDY', 12);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 13', 'Question 13 content', 8, 'QUESTION_REQUEST', 'ETC', 13);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 14', 'Question 14 content', 7, 'QUESTION_REQUEST', 'EXERCISE', 14);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 15', 'Question 15 content', 6, 'QUESTION_REQUEST', 'WAKE_UP', 15);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 16', 'Question 16 content', 5, 'QUESTION_REQUEST', 'STUDY', 1);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 17', 'Question 17 content', 4, 'QUESTION_REQUEST', 'ETC', 2);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 18', 'Question 18 content', 3, 'QUESTION_REQUEST', 'EXERCISE', 3);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 19', 'Question 19 content', 2, 'QUESTION_REQUEST', 'WAKE_UP', 4);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 20', 'Question 20 content', 1, 'QUESTION_REQUEST', 'STUDY', 5);

INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 21', 'Question 21 content', 0, 'QUESTION_REQUEST', 'ETC', 1);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 22', 'Question 22 content', 0, 'QUESTION_REQUEST', 'EXERCISE', 2);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 23', 'Question 23 content', 0, 'QUESTION_REQUEST', 'WAKE_UP', 3);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 24', 'Question 24 content', 0, 'QUESTION_REQUEST', 'STUDY', 4);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 25', 'Question 25 content', 0, 'QUESTION_REQUEST', 'ETC', 5);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 26', 'Question 26 content', 0, 'QUESTION_REQUEST', 'EXERCISE', 6);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 27', 'Question 27 content', 0, 'QUESTION_REQUEST', 'WAKE_UP', 7);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 28', 'Question 28 content', 0, 'QUESTION_REQUEST', 'STUDY', 8);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 29', 'Question 29 content', 0, 'QUESTION_REQUEST', 'ETC', 9);
INSERT INTO question (title, content, like_count, question_status, tag, member_id) VALUES ('Question 30', 'Question 30 content', 0, 'QUESTION_REQUEST', 'EXERCISE', 10);

