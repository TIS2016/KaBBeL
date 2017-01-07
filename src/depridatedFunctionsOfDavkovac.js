       davkovac.prototype.createTree = function () {
            this.update();
            var result = [];
            result.push(this.config);
            result.push(this.parts[this.mainPart]);
            result = result.concat(this.novaStruktura());
            this.uncollapse();
            this.createUsedID(result);
            return result;
        }

        davkovac.prototype.createTreeByID = function (id) {
            this.update();
            var result = [];
            this.clicked = id;
            result.push(this.config);
            var newFather = this.createFather(id);
            result = result.concat(this.toDepthFirst(this.copyThisStuff(this.novaStrukturaPodlaID(id), newFather), newFather));
            this.uncollapseByID(id);
            this.createUsedID(result);
            return result;

                davkovac.prototype.copyThisStuff = function (synovia, otec) {
            var result = [];
            var dalsiPrechadzany = [];
            var prechadzany = [otec];
            var dalsiSynovia = [];
            while (prechadzany.length != 0) {
                dalsiPrechadzany = [];
                prechadzany.forEach(function (otec) {
                    synovia.forEach(function (syn) {
                        if (syn.parentID == otec.id) {
                            var part = {
                                datumUzavretia: syn.datumUzavretia,
                                program: syn.program,
                                datumKoncaZmluvy: syn.datumKoncaZmluvy,
                                showing: syn.showing,
                                id: syn.id,
                                sons: syn.sons,
                                parent: otec,
                                otec: otec,
                                parentID: otec.id,
                                hlbka: syn.hlbka,
                                text: {
                                    name: syn.text.name,
                                    title: syn.text.title,
                                }
                            }
                            if (syn.collapsed != undefined) {
                                part.collapsed = true;
                            }
                            result.push(part);
                            dalsiPrechadzany.push(part);
                        }
                        else {
                            dalsiSynovia.push(syn);
                        }
                    });
                    synovia = dalsiSynovia;
                })
                prechadzany = dalsiPrechadzany;
                
            }
            return result;
        }
        //Do not use
        davkovac.prototype.novaStrukturaPodlaID = function (id) {
            var result = [];
            var urovne = 1;
            var prechadzam = [this.parts[id]];
            var budemPrechadzat = [];
            var self = this;
            while (prechadzam.length != 0&&urovne<self.grafDepth) {
                budemPrechadzat = [];
                prechadzam.forEach(function (part) {
                    if (part.sons.length != 0) {
                        part.collapsed = true;
                    }
                    part.hlbka = urovne;
                    for (var i = self.displayNumber * part.showing; i < self.displayNumber * part.showing + self.displayNumber && i < part.sons.length; i++) {
                        result.push(part.sons[i]);
                        budemPrechadzat.push(part.sons[i]);
                    }
                });
                prechadzam = budemPrechadzat;
                urovne++;
            }
            return result;
        }
        //Do not use
        davkovac.prototype.uncollapseByID = function (id) {
            this.parts[id].collapsed = false;
            if (this.clicked == id) {
                console.log("fine");
                return;
            }
            nextParent = this.parts[this.clicked];
            while (nextParent != this.parts[id]) {
                nextParent.collapsed = false;
                nextParent = nextParent.parent;
            }
        }
        //Do not use
        davkovac.prototype.createFather = function (id) {
            part = {
                showing: this.parts[id].showing,
                id: id,
                sons: this.parts[id].sons,
                collapsed: true,
                hlbka: 0,
                text: {
                    name: this.parts[id].text.name,
                }
            }
            return part;
        }
        //Do not use
        davkovac.prototype.createUsedID = function (pole) {
            this.usedID = [];
            for (i = 1; i < pole.length; i++) {
                //console.log(pole[i]);
                this.usedID[i-1]=pole[i].id;
            }
        }

        //Do not use
        davkovac.prototype.novaStruktura = function () {
            var result = [];
            var prechadzam = [this.parts[this.mainPart]];
            var budemPrechadzat = [];
            var self = this;
            while (prechadzam.length != 0) {
                budemPrechadzat = [];
                prechadzam.forEach(function (part) {
                    if (part.sons.length != 0) {
                        part.collapsed = true;
                    }
                    for (var i = self.displayNumber * part.showing; i < self.displayNumber * part.showing + self.displayNumber && i < part.sons.length; i++) {
                        result.push(part.sons[i]);
                        budemPrechadzat.push(part.sons[i]);
                    }
                });
                prechadzam = budemPrechadzat;
            }
            return result;
        }
