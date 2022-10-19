SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE serv_admin_area_headquarters;
TRUNCATE TABLE serv_administrators;
TRUNCATE TABLE serv_answers;
TRUNCATE TABLE serv_area_headquarters;
TRUNCATE TABLE serv_areas;
TRUNCATE TABLE serv_forgot_passwords;
TRUNCATE TABLE serv_headquarters;
TRUNCATE TABLE serv_permision_roles;
TRUNCATE TABLE serv_permisions;
TRUNCATE TABLE serv_questions;
TRUNCATE TABLE serv_roles;
TRUNCATE TABLE serv_surveys;
TRUNCATE TABLE serv_survey_questions;
TRUNCATE TABLE serv_terminals;
TRUNCATE TABLE serv_terminal_surveys;
TRUNCATE TABLE serv_theme_area_headquarters;
TRUNCATE TABLE serv_themes;
TRUNCATE TABLE serv_type_users;
TRUNCATE TABLE serv_type_answers;


SET FOREIGN_KEY_CHECKS = 1;
-- permisos
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar roles',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar tipos de usuarios',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar usuarios',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar areas',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar preguntas',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar encuestas',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('ver permisos',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('ver tipos de respuestas',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('ver reportes',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('ver terminales con ecuestas',1);
INSERT INTO serv_permisions (prm_name,prm_state)
VALUES ('administrar terminales',1);
-- rol
INSERT INTO serv_roles (rls_name,rls_state)
VALUES ('DESARROLLADOR',1);
-- rol ❤️ permiso ❤️ DESARROLLADOR
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,1,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,2,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,3,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,4,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,5,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,6,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,7,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,8,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,9,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,10,1);
INSERT INTO serv_permision_roles (id_rol,id_permision,prmRls_state)
VALUES (1,11,1);
-- tipo de usuario
INSERT INTO serv_type_users (tyUsr_name,tyUsr_state)
VALUES ('CONSULTOR',1);
-- usuario
INSERT INTO serv_administrators (id_type_user,id_rol,adm_name,adm_lastName,adm_email,adm_password,adm_state)
VALUES (1,1,'MOISES','OCHOA','servest@unifranz.edu.bo','secreto',1);
-- sedes
INSERT INTO serv_headquarters (hdq_name)
VALUES ('COCHABAMBA');
INSERT INTO serv_headquarters (hdq_name)
VALUES ('EL ALTO');
INSERT INTO serv_headquarters (hdq_name)
VALUES ('LA PAZ');
INSERT INTO serv_headquarters (hdq_name)
VALUES ('SANTA CRUZ');
-- tipos de respuestas
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('5 opciones',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('4 opciones',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('3 opciones',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('2 opciones',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('comentario',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('del 1 al 100',1);
INSERT INTO serv_type_answers (tyAns_name,tyAns_state)
VALUES ('del 1 al 10',1);
-- areas
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('SERVICIOS ESTUDIANTILES',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('CAJA',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('ARCA',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('BIBLIOTECA',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('MARKETING Y ADMISIONES',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('COMEDOR',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('CUENTAS POR COBRAR',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('FOTOCOPIADORA',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('TECNOLOGÍA DE LA INFORMACIÓN',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('DECANATURA 1',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('MEDICINA',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('RECEPCIÓN',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('POSTGRADO',1);
INSERT INTO serv_areas (ars_name,ars_state)
VALUES ('DECANATURA 2',1);
-- area ❤️ sede ❤️ COCHABAMBA
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,1,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,2,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,3,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,4,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,5,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,7,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,10,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,11,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,12,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (1,13,1);
-- area ❤️ sede ❤️ EL ALTO
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,1,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,2,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,3,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,4,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,5,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,6,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,7,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,8,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,9,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (2,10,1);
-- area ❤️ sede ❤️ LA PAZ
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,1,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,2,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,3,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,4,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,5,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,6,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,7,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,8,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,9,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (3,10,1);
-- area ❤️ sede ❤️ SANTA CRUZ
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,1,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,2,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,3,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,4,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,5,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,10,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,11,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,7,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,14,1);
INSERT INTO serv_area_headquarters (id_campus,id_area,arsHdq_state)
VALUES (4,13,1);
-- admin ❤️ area ❤️ sede
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,1,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,2,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,3,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,4,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,5,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,6,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,7,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,8,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,9,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,10,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,11,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,12,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,13,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,14,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,15,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,16,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,17,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,18,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,19,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,20,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,21,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,22,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,23,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,24,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,25,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,26,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,27,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,28,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,29,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,30,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,31,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,32,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,33,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,34,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,35,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,36,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,37,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,38,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,39,1);
INSERT INTO serv_admin_area_headquarters (id_admin,id_area_campus,state)
VALUES (1,40,1);