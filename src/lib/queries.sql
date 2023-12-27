-- These were run locally on the console.

CREATE TABLE if not exists quizzes (
    quiz_id serial primary key,
    title varchar(255) not null,
    description text,
    question_text text not null,
    created_at timestamptz default now()
);

CREATE TABLE if not exists answers (
    answer_id serial primary key,
    quiz_id int references quizzes(quiz_id) on delete cascade,
    answer_text text not null,
    is_correct boolean not null
);

INSERT INTO quizzes(title, description, question_text) values(
         'Programming Quiz 1',
         'A quiz about programming concepts',
         'What is a variable?'
        );

INSERT INTO quizzes(title, description, question_text) values(
                                                                 'Programming Quiz 2',
                                                                 'A quiz about programming concepts',
                                                                 'What is a variable?'
                                                             );

INSERT INTO quizzes(title, description, question_text) values(
                                                                 'Programming Quiz 3',
                                                                 'A quiz about programming concepts',
                                                                 'What is a variable?'
                                                             );

SELECT * FROM quizzes;
DELETE FROM quizzes WHERE 1=1;

-- Quiz 1
INSERT INTO answers(quiz_id, answer_text, is_correct)
             VALUES(5, 'A container for storing data', true);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(5, 'A programming language', false);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(5, 'A mathematical operation', false);

-- Quiz 2
INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(6, 'A container for storing data', true);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(6, 'A programming language', false);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(6, 'A mathematical operation', false);

-- Quiz 3
INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(7, 'A container for storing data', true);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(7, 'A programming language', false);

INSERT INTO answers(quiz_id, answer_text, is_correct)
VALUES(7, 'A mathematical operation', false);


SELECT
    q.quiz_id,
    q.title AS quiz_title,
    q.description AS quiz_description,
    q.question_text AS quiz_question,
    a.answer_id,
    a.answer_text,
    a.is_correct
FROM quizzes AS q
         JOIN answers AS a ON q.quiz_id = a.quiz_id
WHERE q.quiz_id = 1;

DELETE FROM answers WHERE 1=1;
