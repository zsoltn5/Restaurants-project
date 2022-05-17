create database if not exists vendeglodb;
-- drop database vendeglodb;
use vendeglodb;

create table if not exists vendeglo (
    VID int primary key auto_increment,
    VNev varchar(100),
    Varos varchar(264),
    Utca varchar(264),
    Szam int,
    Telefon varchar(64),
    Nyitas int,
    Zaras int
);

create table if not exists felhasznalo (
    FID int primary key auto_increment,
    Nev varchar(64)
);

create table if not exists foglalas (
    FoglalasId int primary key auto_increment,
    VID int,
    FID int,
    Ora int
);

create table if not exists kepek (
    KID int primary key auto_increment,
    VID int,
    Kpath varchar(264)
);

insert into vendeglo(VNev, Varos, Utca, Szam, Telefon, Nyitas, Zaras) values 
					('UBB Vendeglo', 'Kolozsvar', 'Farkas', 1, '0748227455', 9, 14),
					('Koszos Csarda', 'Vasarhely', 'Hunyadi', 109, '0748227455', 9, 20),
					('GombaBisztro', 'Deva', 'Eminescu', 67, '0748227455', 10, 22);
                    
insert into felhasznalo(Nev) values
					('Nistor Zsolt'),
					('Szucs Marta'),
					('Lakatos Lajos'),
					('Buzogany Samuel');
					
                    
insert into foglalas(FID, VID, Ora) values
					(1, 2, 15),
					(1, 1, 13),
					(2, 3, 10),
					(4, 3, 17),
					(3, 2, 19),
					(4, 2, 13),
					(1, 3, 12),
					(4, 1, 11);