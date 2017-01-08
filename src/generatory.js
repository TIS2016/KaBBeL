// vygeneruje strukturovany strom ktory ma priblizne pocet synov ako premenna pocet.
		function vygenerujStrom(pocet) {
            return vygenerujRozlozenie(pocet);
            function spracujRozlozenie(pole) {
                function spracujStrom(stromy) {
                    var otcovia = [];
                    for (var i = 0; i < stromy.length; i++) {
                        var novySyn = new vytvorSyna(aktualneID)
                        otcovia.push(novySyn);
                        aktualneID++;
                        for (var j = 0; j < stromy[i][0]; j++) {
                            novySyn.synovia.push(new vytvorSyna(aktualneID));
                            aktualneID++;
                        }
                        for (var j = 0; j < stromy[i][1]; j++) {
                            novySyn.synovia[Math.floor(Math.random() * novySyn.synovia.length)].synovia.push(new vytvorSyna(aktualneID));
                            aktualneID++;
                        }
                    }
                    return otcovia;
                }
                var aktualneID = 1;
                stromy = [];
                pole.forEach(function (item) {
                    stromy.push(spracujStrom(item));
                });
                var result = [];
                stromy.forEach(function (strom) {
                    result.push(flatten(strom));
                })
                //return result;
                return [0].concat(zotatStromyZachranitBobry(result));
            }
            function flatten(strom) {
                var result = [strom, []];
                var naSpracovanie = strom;
                var buduce = [];
                while (naSpracovanie.length != 0) {
                    buduce = [];
                    naSpracovanie.forEach(function (item) {
                        item.synovia.forEach(function (item2) {
                            item2.otec = item;
                            item2.otecID = item.id;
                            result[1].push(item2);
                            buduce.push(item2);
                        })
                    });
                    naSpracovanie = buduce;
                }
                return result;
            }
            function zotatStromyZachranitBobry(poleStromov) {
                var hlavnyStrom = poleStromov.pop();
                var hlavnyOtec = new vytvorSyna(0);
                hlavnyOtec.datumUzavretia = "8.12.2016";
                for (var i = 0; i < hlavnyStrom[0].length; i++) {
                    hlavnyStrom[0][i].otecID = 0;
                    hlavnyStrom[0][i].otec = hlavnyOtec;
                }
                var previous = [];
                var result = [];
                result = result.concat(hlavnyStrom[1]);
                result = result.concat(hlavnyStrom[0]);
                var index = 0;
                poleStromov.forEach(function (strom) {
                    if (Math.random() < 0.3 || previous.length == 0) {
                        index = Math.floor(Math.random() * result.length);
                        strom[0].forEach(function (syn) {
                            syn.otec = result[index];
                            syn.otecID = result[index].id;
                        });
                    }
                    else {
                        index = Math.floor(Math.random() * previous.length);
                        strom[0].forEach(function (syn) {
                            syn.otec = previous[index];
                            syn.otecID = previous[index].id;
                        });
                    }
                    result = result.concat(strom[0]);
                    result = result.concat(strom[1]);
                    previous = strom[1];
                })
                return dodajExtraInfo(result);
            }
            function dodajExtraInfo(poleSynov) {
                var prejdi = poleSynov;
                var nasledujuce = [];
                var udaje = null;
                var result = [];
                while (prejdi.length != 0) {
                    //console.log("zostavaju " + prejdi.length);
                    nasledujuce = [];
                    prejdi.forEach(function (syn) {
                        if (syn.otec.datumUzavretia == null) {
                            nasledujuce.push(syn);
                        }
                        else {
                            udaje = pridajSynoviDodatoneInfo(syn.otec.datumUzavretia);
                            syn.datumUzavretia = udaje[0];
                            syn.datumUkoncenia = udaje[2];
                            syn.program = udaje[1];
                            result.push(syn);
                        }
                    });
                    prejdi = nasledujuce;
                }
                return result;
            }
            //datumUz,prog,datumKon
            function vytvorSyna(jehoID) {
                this.meno = generujMeno();
                this.zarobok = 10 + Math.ceil(Math.random() * 300);
                this.id = jehoID;
                this.synovia = [];
                this.otec = null;
                this.otecID = null;
                this.program = null;
                this.datumUzavretia = null;
                this.datumUkoncenia = null;
            }
            function pridajSynoviDodatoneInfo(otcovDatumPridania) {
                var datumUzavretia = generujDatum(otcovDatumPridania);
                var program = ["FREE", "SILVER", "GOLD", "VIP"];
                shuffle(program);
                program = program[0];
                var datumUkoncenia = generujKonecnyDatum(datumUzavretia);
                return [datumUzavretia, program, datumUkoncenia];
            }
            function shuffle(a) {
                var j, x, i;
                for (i = a.length; i; i--) {
                    j = Math.floor(Math.random() * i);
                    x = a[i - 1];
                    a[i - 1] = a[j];
                    a[j] = x;
                }
            }
            function generujKonecnyDatum(datum) {
                var vstup = datum.split('.');
                var rok = eval(vstup[2]);
                var mesiac = eval(vstup[1]) + 2;
                var den = eval(vstup[0]);
                if (mesiac > 12) {
                    rok++;
                    mesiac -= 12;
                }
                return "" + den + "." + mesiac + "." + rok;
            }
            function generujDatum(datum) {
                var vstup = datum.split('.');
                var aktualnyDen = eval(vstup[2]) * 366 + eval(vstup[1]) * 31 + eval(vstup[0]);
                var resultDate = aktualnyDen + Math.ceil(Math.random() * 300);
                var rok = Math.floor(resultDate / 366);
                resultDate -= rok * 366;
                var mesiac = Math.floor(resultDate / 30);
                resultDate -= mesiac * 30;
                if (resultDate == 0) {
                    resultDate = 1;
                }
                if (mesiac == 0) {
                    mesiac = 1;
                }
                return "" + resultDate + "." + mesiac + "." + rok;
            }
            function generujMeno() {
                var meno = "";
                krstneM = ['Melany', 'Virginia', 'Lauretta', 'Ryan', 'Araceli', 'Billye', 'Stacey', 'Carl', 'Lucinda', 'Teodora', 'Julee', 'Norma', 'Harland', 'Kali', 'Tommye', 'Mazie', 'Octavia', 'Daisey', 'Raul', 'Marcy', 'Rayna', 'Mica', 'Annette', 'Maragret', 'Eliz', 'Martina', 'Clementina', 'Daniel', 'Doloris', 'Shasta', 'Mirtha', 'Fleta', 'Pandora', 'Candelaria', 'Alan', 'Chan', 'Christene', 'Christiana', 'Hang', 'Florinda', 'Carri', 'Jermaine', 'Janiece', 'Scott', 'Tameka', 'Madeleine', 'Pam', 'Ardella', 'Many', 'Dede', 'Apolonia', 'Shanda', 'Denver', 'Shante', 'Margorie', 'Maryann', 'Jovita', 'Zonia', 'Marci', 'Almeda', 'Aileen', 'Lauri', 'Yasuko', 'Olen', 'Barbra', 'Verna', 'January', 'Herschel', 'Dave', 'Candyce', 'Freeman', 'Leonor', 'Mira', 'Meaghan', 'Shin', 'Zachery', 'Tina', 'Cristina', 'Zack', 'Gaylene', 'Shemika', 'Karol', 'Vennie', 'Meghann', 'Fatimah', 'Mafalda', 'Guadalupe', 'Frances', 'Tamra', 'Ashlee', 'Frederic', 'Margarito', 'Augustina', 'Jamee', 'Maynard', 'Yon', 'Krystle', 'Maya', 'Norine', 'Coral', 'Tanya', 'Eldora', 'Marquerite', 'Krysten', 'Lavonda', 'Maegan', 'Lavenia', 'Alona', 'Silvana', 'Delta', 'Onita', 'Renaldo', 'Dirk', 'Clarinda', 'Tamatha', 'Del', 'Robyn', 'Stormy', 'Genny', 'Latrisha', 'Marilou', 'Courtney', 'Arletta', 'Juli', 'Corene', 'Shaunte', 'Kasha', 'Sid', 'Eustolia', 'Gemma', 'Kizzy', 'Hester', 'Almeta', 'Chin', 'Irish', 'Manie', 'Soila', 'Isabella', 'Wilbert', 'Shelby', 'Tula', 'Rolanda', 'Xenia', 'Merry', 'Sherilyn', 'Harmony', 'Selena', 'Inocencia', 'Daren', 'Otto', 'Angeline', 'Tyron', 'Georgiann', 'Terese', 'Otelia', 'Mirian', 'Kendra', 'Garrett', 'Wilber', 'Izola', 'Sindy', 'Mee', 'Lavelle', 'Bridgette', 'Ashlyn', 'Winifred', 'Claribel', 'Sheridan', 'India', 'Jaquelyn', 'Roseanne', 'Muoi', 'Estefana', 'Reina', 'Jule', 'Donte', 'Buster', 'Stephany', 'Maximo', 'Pearlene', 'Carlo', 'Gerald', 'Asuncion', 'Cassondra', 'Gary', 'Risa', 'Kelli', 'Carolyne', 'Brook', 'Marya', 'Wilbur', 'Eunice', 'Julia', 'Bridget', 'Mariano', 'Man', 'Kimberely', 'Ethelyn', 'Librada', 'Olga', 'Myrl', 'Magdalena', 'Alphonse', 'Charlsie', 'Eliseo', 'Kiersten', 'Kris', 'Arlette', 'Rozanne', 'Colin', 'Kami', 'Malik', 'Fritz', 'Bob', 'Teresita', 'Wei', 'Season', 'Chet', 'Brendan', 'Sommer', 'Marylyn', 'Grady', 'Crystle', 'Penni', 'Devona', 'Riley', 'Dinorah', 'Jeffie', 'Monika', 'Dorine', 'Anette', 'Thresa', 'Felton', 'Nicolle', 'Lashawna', 'Rivka', 'Dominga', 'Cassey', 'Rochelle', 'Pamula', 'Tammara', 'Diedra', 'Noe', 'Prince', 'Korey', 'Nancie', 'Lien'];
                meno += krstneM[Math.floor(Math.random() * krstneM.length)] + " " + generujPriezvisko();
                return meno;
            }
            function generujPriezvisko() {
                var possible = "BCDFGHJKLMNPQRSTVWXYZ";;
                var priezvisko = "" + possible.charAt(Math.floor(Math.random() * possible.length));
                possible1 = "bcdfghjklmnpqrstvwxyz";
                possible2 = "aeiou";
                for (i = 0; i < 5 + Math.random() * 8; i++) {
                    if (i % 2 == 0) {
                        priezvisko += possible2.charAt(Math.floor(Math.random() * possible2.length));
                    }
                    else {
                        priezvisko += possible1.charAt(Math.floor(Math.random() * possible1.length));
                    }
                }
                return priezvisko;
            }
            function vygenerujRozlozenie(kolko) {
                function shuffle(a) {
                    var j, x, i;
                    for (i = a.length; i; i--) {
                        j = Math.floor(Math.random() * i);
                        x = a[i - 1];
                        a[i - 1] = a[j];
                        a[j] = x;
                    }
                }
                function vygenerujSynov(uzHotovych) {
                    pole = [];
                    for (i = 1; i < 10 + Math.floor(25 * Math.random()) ; i++) {
                        pole.push(Math.floor((i * i) / i));
                    }
                    shuffle(pole);
                    pole2 = [];
                    for (i = 1; i < pole.length + 1 ; i++) {
                        pole2.push(Math.floor((i * i) / 2 / (kolko / celkovyPocet)));
                    }
                    shuffle(pole2);
                    var synovia = [];
                    for (i = 0; i < pole.length; i++) {
                        synovia.push([pole[i], pole2[i]]);
                    }
                    return synovia;
                }
                function count(synovia) {
                    var pocet = 0;
                    synovia.forEach(function (prvok) {
                        pocet += prvok[0] + prvok[1];
                    });
                    return pocet;
                }
                var celkovyPocet = 1;
                rozneStromy = [];
                while (celkovyPocet < kolko) {
                    var temp = vygenerujSynov(celkovyPocet);
                    rozneStromy.push(temp);
                    celkovyPocet = celkovyPocet + count(temp);
                }
                return spracujRozlozenie(rozneStromy);
            }
        }
		
		// vygeneruje jednoduchy strom ktory ma presne pocet synov ako premenna pocet.
        function simpleGeneracia(pocet) {
            function pridajSynoviDodatocneInfo(otcovDatumPridania) {
                var datumUzavretia = generujDatum(otcovDatumPridania);
                var program = ["FREE", "SILVER", "GOLD", "VIP"];
                shuffle(program);
                program = program[0];
                var datumUkoncenia = generujKonecnyDatum(datumUzavretia);
                return [datumUzavretia, program, datumUkoncenia];
            }
            function shuffle(a) {
                var j, x, i;
                for (i = a.length; i; i--) {
                    j = Math.floor(Math.random() * i);
                    x = a[i - 1];
                    a[i - 1] = a[j];
                    a[j] = x;
                }
            }
            function generujKonecnyDatum(datum) {
                var vstup = datum.split('.');
                var rok = eval(vstup[2]);
                var mesiac = eval(vstup[1]) + 2;
                var den = eval(vstup[0]);
                if (mesiac > 12) {
                    rok++;
                    mesiac -= 12;
                }
                return "" + den + "." + mesiac + "." + rok;
            }
            function generujDatum(datum) {
                var vstup = datum.split('.');
                var aktualnyDen = eval(vstup[2]) * 366 + eval(vstup[1]) * 31 + eval(vstup[0]);
                var resultDate = aktualnyDen + Math.ceil(Math.random() * 300);
                var rok = Math.floor(resultDate / 366);
                resultDate -= rok * 366;
                var mesiac = Math.floor(resultDate / 30);
                resultDate -= mesiac * 30;
                if (resultDate == 0) {
                    resultDate = 1;
                }
                if (mesiac == 0) {
                    mesiac = 1;
                }
                return "" + resultDate + "." + mesiac + "." + rok;
            }
            function generujMeno() {
                var meno = "";
                krstneM = ['Melany', 'Virginia', 'Lauretta', 'Ryan', 'Araceli', 'Billye', 'Stacey', 'Carl', 'Lucinda', 'Teodora', 'Julee', 'Norma', 'Harland', 'Kali', 'Tommye', 'Mazie', 'Octavia', 'Daisey', 'Raul', 'Marcy', 'Rayna', 'Mica', 'Annette', 'Maragret', 'Eliz', 'Martina', 'Clementina', 'Daniel', 'Doloris', 'Shasta', 'Mirtha', 'Fleta', 'Pandora', 'Candelaria', 'Alan', 'Chan', 'Christene', 'Christiana', 'Hang', 'Florinda', 'Carri', 'Jermaine', 'Janiece', 'Scott', 'Tameka', 'Madeleine', 'Pam', 'Ardella', 'Many', 'Dede', 'Apolonia', 'Shanda', 'Denver', 'Shante', 'Margorie', 'Maryann', 'Jovita', 'Zonia', 'Marci', 'Almeda', 'Aileen', 'Lauri', 'Yasuko', 'Olen', 'Barbra', 'Verna', 'January', 'Herschel', 'Dave', 'Candyce', 'Freeman', 'Leonor', 'Mira', 'Meaghan', 'Shin', 'Zachery', 'Tina', 'Cristina', 'Zack', 'Gaylene', 'Shemika', 'Karol', 'Vennie', 'Meghann', 'Fatimah', 'Mafalda', 'Guadalupe', 'Frances', 'Tamra', 'Ashlee', 'Frederic', 'Margarito', 'Augustina', 'Jamee', 'Maynard', 'Yon', 'Krystle', 'Maya', 'Norine', 'Coral', 'Tanya', 'Eldora', 'Marquerite', 'Krysten', 'Lavonda', 'Maegan', 'Lavenia', 'Alona', 'Silvana', 'Delta', 'Onita', 'Renaldo', 'Dirk', 'Clarinda', 'Tamatha', 'Del', 'Robyn', 'Stormy', 'Genny', 'Latrisha', 'Marilou', 'Courtney', 'Arletta', 'Juli', 'Corene', 'Shaunte', 'Kasha', 'Sid', 'Eustolia', 'Gemma', 'Kizzy', 'Hester', 'Almeta', 'Chin', 'Irish', 'Manie', 'Soila', 'Isabella', 'Wilbert', 'Shelby', 'Tula', 'Rolanda', 'Xenia', 'Merry', 'Sherilyn', 'Harmony', 'Selena', 'Inocencia', 'Daren', 'Otto', 'Angeline', 'Tyron', 'Georgiann', 'Terese', 'Otelia', 'Mirian', 'Kendra', 'Garrett', 'Wilber', 'Izola', 'Sindy', 'Mee', 'Lavelle', 'Bridgette', 'Ashlyn', 'Winifred', 'Claribel', 'Sheridan', 'India', 'Jaquelyn', 'Roseanne', 'Muoi', 'Estefana', 'Reina', 'Jule', 'Donte', 'Buster', 'Stephany', 'Maximo', 'Pearlene', 'Carlo', 'Gerald', 'Asuncion', 'Cassondra', 'Gary', 'Risa', 'Kelli', 'Carolyne', 'Brook', 'Marya', 'Wilbur', 'Eunice', 'Julia', 'Bridget', 'Mariano', 'Man', 'Kimberely', 'Ethelyn', 'Librada', 'Olga', 'Myrl', 'Magdalena', 'Alphonse', 'Charlsie', 'Eliseo', 'Kiersten', 'Kris', 'Arlette', 'Rozanne', 'Colin', 'Kami', 'Malik', 'Fritz', 'Bob', 'Teresita', 'Wei', 'Season', 'Chet', 'Brendan', 'Sommer', 'Marylyn', 'Grady', 'Crystle', 'Penni', 'Devona', 'Riley', 'Dinorah', 'Jeffie', 'Monika', 'Dorine', 'Anette', 'Thresa', 'Felton', 'Nicolle', 'Lashawna', 'Rivka', 'Dominga', 'Cassey', 'Rochelle', 'Pamula', 'Tammara', 'Diedra', 'Noe', 'Prince', 'Korey', 'Nancie', 'Lien'];
                meno += krstneM[Math.floor(Math.random() * krstneM.length)] + " " + generujPriezvisko();
                return meno;
            }
            function generujPriezvisko() {
                var possible = "BCDFGHJKLMNPQRSTVWXYZ";;
                var priezvisko = "" + possible.charAt(Math.floor(Math.random() * possible.length));
                possible1 = "bcdfghjklmnpqrstvwxyz";
                possible2 = "aeiou";
                for (var i = 0; i < 5 + Math.random() * 8; i++) {
                    if (i % 2 == 0) {
                        priezvisko += possible2.charAt(Math.floor(Math.random() * possible2.length));
                    }
                    else {
                        priezvisko += possible1.charAt(Math.floor(Math.random() * possible1.length));
                    }
                }
                return priezvisko;
            }
            function vytvorSyna(jehoID) {
                this.meno = generujMeno();
                this.zarobok = 10 + Math.ceil(Math.random() * 300);
                this.id = jehoID;
                this.otecID = null;
                this.program = null;
                this.datumUzavretia = null;
                this.datumUkoncenia = null;
            }
            var poleSynov = [new vytvorSyna(0)];
            poleSynov[0].datumUzavretia = "9.12.2016";
            var novySyn = null;
            var otec = null;
            var dodatocne=null;
            for (var i = 1; i < pocet; i++) {
                console.log("generujem");
                novySyn = new vytvorSyna(i);
                otec = poleSynov[Math.floor(Math.random() * poleSynov.length)];
                novySyn.otecID = otec.id;
                
                dodatocne = pridajSynoviDodatocneInfo(otec.datumUzavretia);
                novySyn.datumUzavretia = dodatocne[0];
                novySyn.datumUkoncenia = dodatocne[2];
                novySyn.program = dodatocne[1];
                poleSynov.push(novySyn);
            }
            return poleSynov;
        }
        
		// skonvertuje vystup funkcii vygenerujStrom a simpleGeneracia na config pole pre treant.js
		function generatedToArray(poleTried) {
            var result = [[poleTried[0].id]];
            var spracovane = [];
            for (var i = 1; i < poleTried.length; i++) {
                spracovane = [poleTried[i].id, poleTried[i].otecID, poleTried[i].meno, poleTried[i].zarobok, poleTried[i].datumUzavretia, poleTried[i].program, poleTried[i].datumUkoncenia];
                result.push(spracovane);
            }
            return result;
        }