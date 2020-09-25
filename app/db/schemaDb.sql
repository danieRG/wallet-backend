# Schema database for didactical proposal

CREATE DATABASE wallet;

use wallet;

# Tables for database, the field is_admin can be 1 -> is admin user or 0 -> is not admin user

CREATE TABLE users (
	id int NOT NULL,
	username varchar(32) NOT NULL,
	password VARCHAR(100) NOT NULL,
	is_admin int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wallet (
	id int NOT NULL,
	id_user int NOT NULL,
	money DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# The field type on table transactions can be retirement, payment

CREATE TABLE transactions (
	id int NOT NULL,
	id_user int NOT NULL,
	date DATE NOT NULL,
	type VARCHAR(20) NOT NULL,
	quantity DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# The field status on table requests can be progress, accepted, rejected
# The field operation can be the same of column type table transactions

CREATE TABLE requests (
	id int(10) NOT NULL,
	date DATE NOT NULL,
	id_requester int NOT NULL,
	status VARCHAR(20) NOT NULL,
	message VARCHAR(150),
	operation VARCHAR(20) NOT NULL,
	quantity DOUBLE NOT NULL,
	id_admin_request int 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE user_details (
	id int(10) NOT NULL,
	name VARCHAR(150) NOT NULL,
	email VARCHAR(150) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	id_user int NOT NULL,
	documento VARCHAR(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE wallet ADD PRIMARY KEY (id);
ALTER TABLE transactions ADD PRIMARY KEY (id);
ALTER TABLE requests ADD PRIMARY KEY (id);
ALTER TABLE user_details ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE wallet MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE transactions MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE requests MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE user_details MODIFY id int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE wallet ADD FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE transactions ADD FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE requests ADD FOREIGN KEY (id_requester) REFERENCES users(id);
ALTER TABLE requests ADD FOREIGN KEY (id_admin_request) REFERENCES users(id);
ALTER TABLE user_details ADD FOREIGN KEY (id_user) REFERENCES users(id);

# Users not admin

INSERT INTO users (username,password,is_admin) VALUES ('Daniel', sha1('password'), 0);
INSERT INTO users (username,password,is_admin) VALUES ('Martin', sha1('password'), 0);

INSERT INTO user_details (name,email,phone,id_user,documento) VALUES ('Daniel Ruiz', 'test@tst.com', 5555555555, 1,'1a2b3c');
INSERT INTO user_details (name,email,phone,id_user,documento) VALUES ('Martin Guillen', 'test2@tst.com', 5555555555, 2,'3c2b1a');

# Users admin

INSERT INTO users (username,password,is_admin) VALUES ('admin', sha1('admin'), 1);
INSERT INTO users (username,password,is_admin) VALUES ('admin2', sha1('admin2'), 1);

INSERT INTO user_details (name,email,phone,id_user,documento) VALUES ('Administrador', 'admin@tst.com', 9999999999, 3,'');
INSERT INTO user_details (name,email,phone,id_user,documento) VALUES ('Administrador2', 'admin2@tst.com', 9999999999, 4,'');
# Wallet of users

INSERT INTO wallet (id_user,money) VALUES (1, 100000);
INSERT INTO wallet (id_user,money) VALUES (2, 400000);