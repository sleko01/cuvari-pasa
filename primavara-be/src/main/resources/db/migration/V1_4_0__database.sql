ALTER TABLE AGREED_REQUEST DROP CONSTRAINT agreed_request_initiator_user_id_fkey;
ALTER TABLE AGREED_REQUEST ADD CONSTRAINT agreed_request_initiator_user_id_fkey FOREIGN KEY(initiator_user_id) REFERENCES AppUser(user_id);

ALTER TABLE AGREED_REQUEST DROP CONSTRAINT fkpckmsvli0ni965fd296wutely;
ALTER TABLE AGREED_REQUEST ADD CONSTRAINT agreed_request_user_id_fkey FOREIGN KEY(user_id) REFERENCES AppUser(user_id);
