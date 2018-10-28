

(function() {

    var FixedBottomImageView = Mn.View.extend({
        template: Templates.bottomImage,
        tagName: "li",

        events: {
            "click" : "choosePiece"
        },

        choosePiece: function(){
            console.log("clicked " + this.model.get("id"))
            if(!$("#bottomSlide").hasClass("wasDragged")){
                Backbone.Radio.channel('ui').request('update:model', this.model);
            }        
        }
    });

    var FixedBottomView = Mn.CollectionView.extend({
        tagName: "ul",
        attributes: {
            id: "bottomSlide"
        },

        events: {
            "click .clone" : "chooseClone"
        },

        childView: FixedBottomImageView,

        chooseClone: function(e){
            var id = e.currentTarget.firstElementChild.dataset.id;
            console.log("clicked clone " + id)
            if(!$("#sideSlide").hasClass("wasDragged")){
                var selectedPiece = this.collection.find(e => e.id === id)
                Backbone.Radio.channel('ui').request('update:model', selectedPiece);
            }      
        }
    });

    var FixedSideImageView = Mn.View.extend({
        template: Templates.sideImage,
        tagName: "li",

        events: {
            "click" : "choosePiece"
        },

        choosePiece: function(){
            console.log("clicked " + this.model.get("id"))
            if(!$("#sideSlide").hasClass("wasDragged")){
                Backbone.Radio.channel('ui').request('update:model', this.model);
            }        
        }
    });

    var FixedSideView = Mn.CollectionView.extend({
        tagName: "ul",
        attributes: {
            id: "sideSlide"
        },
        childView: FixedSideImageView,

        events: {
            "click .clone" : "chooseClone"
        },

        chooseClone: function(e){
            var id = e.currentTarget.firstElementChild.dataset.id;
            console.log("clicked clone " + id)
            if(!$("#sideSlide").hasClass("wasDragged")){
                var selectedPiece = this.collection.find(e => e.id === id)
                Backbone.Radio.channel('ui').request('update:model', selectedPiece);
            }      
        }

    });

    var ImageView = Mn.View.extend({
        template: Templates.image,
        tagName: "li",
        attributes: function(){
            return {
                "data-thumb": "img/thumbs/" + this.model.get("url")
            }
        },

        events: {
            "click" : "test"
        },

        test: function(){
            console.log("test " + this.model.get("url"))
        }
    });
    var ImagesView = Mn.CollectionView.extend({
        tagName: "ul",
        attributes: {
            id: "currentImgs"
        },
        childView: ImageView,

        onAttach: function(){
            $("#currentImgs").lightSlider({
                item: 1,
                easing: 'ease-in-out',
                pager: true,
                currentPagerPosition: 'middle',
                gallery: true,	
                galleryMargin: 5,
                thumbMargin: 10,
                thumbItem: 5
            }); 
        }
    })

    var ImageContainerView = Mn.View.extend({
        template: Templates.imageContainer,
        regions: {
            imagesRegion: "#imagesRegion"
        }, 

        onRender: function(){
            this.getRegion("imagesRegion").show(
                new ImagesView({
                    collection: new Backbone.Collection(this.model.get("currentPiece").images)
                })
            );
        },
    });


    var SpecView = Mn.View.extend({template: Templates.specs})
    var SpecsView = Mn.CollectionView.extend({childView: SpecView})

    var DetailsView = Mn.View.extend({
        template: Templates.details,
        regions: {
            specsRegion: "#specsRegion"
        },

        events:{
            "click .contactBtn" : "openContactModal"
        },
        
        onRender: function(){
            this.getRegion("specsRegion").show(
                new SpecsView({
                    collection: new Backbone.Collection(this.model.get("currentPiece").specs)
                })
            );
        },

        openContactModal: function(){
            $("#contactModal").addClass("show");
            $('#menu').removeClass('open');
            $('.links ul').removeClass('open');
        }
    })

    var CurrentPieceView = Mn.View.extend({
        template: Templates.currentPiece,


        regions: {
            detailsRegion: "#detailsRegion",
            imageContainerRegion:  "#imageContainerRegion",
        },

        initialize: function(){
            _.bindAll(this, "updateModel");
            Backbone.Radio.channel('ui').reply('update:model', this.updateModel)
        },

        onRender: function(){
            this.getRegion("detailsRegion").show(new DetailsView({model: this.model}));
            this.getRegion("imageContainerRegion").show(new ImageContainerView({model: this.model}));
        },

        updateModel: function(model){
            if(this.model.get("currentPiece").id != model.get("id")){
                this.model.set("currentPiece",model.attributes)
                this.render();
            }
        }
    })

    var GalleryView = Mn.View.extend({
        template: Templates.gallery,
        
        regions: {
            currentPieceRegion: "#currentPieceRegion",
            fixedSideRegion: "#fixedSideRegion",
            fixedBottomRegion: "#fixedBottomRegion"
        },

        onRender: function(){
            this.getRegion("currentPieceRegion").show(new CurrentPieceView({model: this.model}));

            this.getRegion("fixedSideRegion").show(
                new FixedSideView({
                    collection: new Backbone.Collection(this.model.get("collection"))
                })
            );

            this.getRegion("fixedBottomRegion").show(
                new FixedBottomView({
                    collection: new Backbone.Collection(this.model.get("collection"))
                })
            );
        },
    });
  
    var App = Mn.Application.extend({
      region: '#app',
  
      onStart: function() {
        this.showView(
            new GalleryView({
                model: new Backbone.Model(getData(location.hash))
            })
        );
      }
    });
  
    var app = new App();
  
    app.start();
  
  })();

function getData(currentId){
    var data = {
        collection: [
            {
                id: "shul",
                title: "Burning Shul",
                description: "Stories are told of the savage way in which the Nazis gathered the men of a village into the synagouge and set it ablaze as the women and children watched.",
                images:[{url:"Shul1.jpg"},{url:"Shul2.jpg"},{url:"Shul3.jpg"},{url:"Shul4.jpg"}],
                price: "$35,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "17x12x26\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "125lbs"
                    }
                ]
            },
            {
                id: "jude",
                title: "Jude",
                description: "Jews throughout Nazi-occupied Europe were forced to wear a badge in the form of a Yellow Star as a means of identification. The star was intended to humiliate Jews and to mark them out for segregation and discrimination. ",
                images:[{url:"Star1.jpg"},{url:"Star2.jpg"},{url:"Star3.jpg"}],
                price: "$8,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Orange Calcite"
                    },
                    {
                        header: "Dimensions",
                        value: "20x18x20\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "100lbs"
                    }
                ]
            },
            {
                id: "shoes",
                title: "The Shoes of Rememberance",
                description: "Thousands of pairs all covered the feet of Jewish men, women and children before they were sent to the Nazi gas chambers. Chilling evidence of so many people obeying the command to remove their footwear, likely not knowing what was about to happen to them",
                images:[{url:"Shoes.jpg"},{url:"Shoes2.jpg"},{url:"Shoes3.jpg"}],
                price: "$25,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "26x12x16\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "150lbs"
                    }
                ]
            },
            {
                id: "tallis",
                title: "The Tattered Tallis",
                description: "Piles of prayer shawls that belonged to Jewish victims were found after the liberation of the Auschwitz camp. Poland, after January 1945. The garb in which we served G-d was trampled upon, together with the spirit and lives of those in the camps. Once used to adorn those in prayer, these shawls lay tattered and desicrated.",
                images:[{url:"Tallis.jpg"}],
                price: "$10,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Marble and Silver Plate"
                    },
                    {
                        header: "Dimensions",
                        value: "28x15x8\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
            {
                id: "forest",
                title: "Hiding in the Forest",
                description: "Many Jews fled to nearby forests to escape the grasp of the Nazis.",
                images:[{url:"Tree.jpg"},{url:"Tree2.jpg"}],
                price: "$10,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Soapstone"
                    },
                    {
                        header: "Dimensions",
                        value: "13x13x26\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "50lbs"
                    }
                ]
            },
            {
                id: "book",
                title: "Bloodstained records",
                description: "The Nazis kept meticulous records of millions who died in the camps. Their names are listed in notebooks labeled \"Totenbuch,\" which means \"death book.\" The names are written there, single-spaced, in meticulous handwriting.",
                images:[{url:"Book.jpg"}],
                price: "$12,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster and Indian Ipestone"
                    },
                    {
                        header: "Dimensions",
                        value: "20x18x8\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
            {
                id: "tear",
                title: "Tear of faith",
                description: "The stone flame within this 6-shaped tear is a small memorial, a permenant Yartzeit flame, for the six thousand thousands who were taken",
                images:[{url:"Tear.jpg"}],
                price: "$6,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Orange and Blue Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "8x7x16\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "30lbs"
                    }
                ]
            },
            {
                id: "butterfly",
                title: "The Yellow Butterfly",
                description: "There is a poem, written by Pavel Friedmann of the Theresienstadt Ghetto, named <br>\"The Butterfly\": \" He was the last, truly the last <br> such yellowness was bitter and blinding...\" <br> This poem was the source of inspiration for this sculpture. (Sculpture is pictured here without the barbed wire antennae)",
                images:[{url:"Butterfly.jpg"},{url:"Butterfly2.jpg"},{url:"Butterfly3.jpg"},{url:"Butterfly4.jpg"},{url:"Butterfly5.jpg"},{url:"Butterfly6.jpg"},{url:"Butterfly7.jpg"},{url:"Butterfly8.jpg"}],
                price: "$20,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "23x21x14\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "175lbs"
                    }
                ]
            },
            {
                id: "pajama",
                title: "The Striped Pajama",
                description: "On arrival at concentration camps jews had their clothing stripped away and replaced by a striped uniform. The uniform played a role in dehumanizing the prisoners, taking away thier individuality.",
                images:[{url:"Striped.jpg"},{url:"Pajama2.jpg"},],
                price: "$8,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Marble"
                    },
                    {
                        header: "Dimensions",
                        value: "22x14x27\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "175lbs"
                    }
                ]
            },

            {
                id: "dress",
                title: "Stolen innocence",
                description: " Children were especially vulnerable to Nazi murder or death in the era of the Holocaust. In the ghettos and camps, Jewish children died from starvation and exposure. The Nazis were indifferent to this mass death because they considered Jewish children to be unproductive and hence \"useless eaters\".",
                images:[{url:"Dress.jpg"}],
                price: "$10,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Peach Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "10x6x15\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "75lbs"
                    }
                ]
            },

            {
                id: "rose",
                title: "A Rose Amongst Thorns",
                description: " My Grandparents, survivors of the holocaust, named their first child \"Rose Bertha\" (Raizel Breindel) after both of their mothers.",
                images:[{url:"Rose1.jpg"},{url:"Rose2.jpg"},{url:"Rose3.jpg"},{url:"Rose4.jpg"}],
                price: "$18,000 (includes painting. $12,000 without painting)",
                specs: [
                    {
                        header: "Stone",
                        value: "Raspberry Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "18x18x12\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
            {
                id: "shema",
                title: "Shema",
                description: "Many people died in the war with the prayer \"Shema Yisroel\" on their lips. This is a memorial to them and to the individuals who say it today.",
                images:[{url:"Shma.jpg"},{url:"Shma2.jpg"},],
                price: "$13,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "20x12x18\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
            {
                id: "zaidy",
                title: "Zaidy's Hand",
                description: "The flames are shaped like the hebrew letter ש, and together it spells \"שש\", or the hebrew word for \"six\", to represent the 6 million. (שש Also means marble) The hand is a cast of my grandfather's hand with the actual numbers he was given during the holocaust",
                images:[{url:"Zaidy1.jpg"},{url:"Zaidy2.jpg"},{url:"Zaidy3.jpg"},{url:"Zaidy4.jpg"}],
                price: "Sold. Can be commisioned for $15,000 (subject to finding the stone)",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster and Bronze"
                    },
                    {
                        header: "Dimensions",
                        value: "22x8x25\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "120lbs"
                    }
                ]
            },

            //Judaica Pieces
            {
                id: "israel",
                title: "The Center of the World",
                description: "The Talmud teaches that Israel is the center of the world, the gateway to the heavens and, the foundation from where the earth's creation began. Jerusalem is said to be directly beneath where G-d resides in the heavens",
                images:[{url:"Israel1.jpg"},{url:"Israel2.jpg"}],
                price: "$15,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Blue Onyx and Genuine Yellow Topaz"
                    },
                    {
                        header: "Dimensions",
                        value: "8x8x28\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "150lbs"
                    }
                ]
            },

            {
                id: "pomegranate",
                title: "Pomegranate",
                description: "Grown in the Mediteranean, the Pomegranate is a fruit steeped in an Jewish symbolism and tradition. It has appeared on the ancient pillars and coins of Judea. Jewish tradition teaches that it's seeds number 613, corresponding to the 613 commandments of the Torah. For this reason it is customary to eat pomegranates on Rosh Hashana",
                images:[{url:"Pomegranate.jpg"}],
                price: "$8,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Raspberry Alabaster"
                    },

                    {
                        header: "Dimensions",
                        value: "18x18x12\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }

                ]
            },

            {
                id: "ark",
                title: "Noah's Ark",
                description: "",
                images:[{url:"Ark.jpg"}],
                price: "$6,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Blue Alabaster and Bronze"
                    },
                    {
                        header: "Dimensions",
                        value: "16x10x8\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "60lbs"
                    }
                ]
            },

            {
                id: "bush",
                title: "The Burning Bush",
                description: "",
                images:[{url:"Bush.jpg"},{url:"Bush2.jpg"}],
                price: "$6,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Orange Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "8x7x17\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "60lbs"
                    }
                ]
            },

            {
                id: "dove",
                title: "Dove",
                description: "",
                images:[{url:"Dove.jpg"},{url:"Dove2.jpg"},{url:"Dove3.jpg"}],
                price: "$4,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "6x4x5\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "30lbs"
                    }
                ]
            },

            {
                id: "esrog",
                title: "Esrog",
                description: "",
                images:[{url:"Esrog.jpg"}],
                price: "$6,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "4x4x9\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "35lbs"
                    }
                ]
            },

            {
                id: "sea",
                title: "Splitting of the Sea",
                description: "",
                images:[{url:"Sea.jpg"}],
                price: "$8,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Orange and Blue Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "18x8x10\" (with all 3 pieces)" 
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },

            {
                id: "shofar",
                title: "Shofar",
                description: "",
                images:[{url:"Shofar.jpg"}],
                price: "$4,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "14x3x3\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "25lbs"
                    }
                ]
            },

            {
                id: "candles",
                title: "Lighting Shabbos Candles",
                description: "",
                images:[{url:"Candles1.jpg"},{url:"Candles2.jpg"}],
                price: "$15,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "20x12x18\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
            
            {
                id: "whale",
                title: "Jonah and the Whale",
                description: "",
                images:[{url:"Whale.jpg"}],
                price: "$8,000",
                specs: [
                    {
                        header: "Stone",
                        value: "Blue Alabaster"
                    },
                    {
                        header: "Dimensions",
                        value: "13x6x6\""
                    },
                    {
                        header: "Approximate Weight",
                        value: "80lbs"
                    }
                ]
            },
        ]
    
    }

    if(currentId && currentId.startsWith("#id-")){
        data.currentPiece = data.collection.find(e => e.id === currentId.substring(4))
    }else
        data.currentPiece = data.collection[0]

    return data;
}