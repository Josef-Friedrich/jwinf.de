function initTask(subTask) {
   subTask.gridInfos = {
      conceptViewer: false,
      //Hier wird der Kontext definiert. Mit dem Kontext werden ItemTypes und Aufgabenspezifische Übersetzungen geladen
      contextType: "flowers",
      //Die BWINF-spezifischen Farben. Bitte in jeder Aufgabendatei laden, da die Blocktypen sonst nicht konsistent eingefärbt sind
      //(Unsere Farben sind natürlich schöner)
      blocklyColourTheme: "bwinf",
      //Gibt an, ob die Programme gespeichert und geladen werden können über das Menu auf der rechten Seite.
      //Für Wettbewerbe immer auf true setzen
      hideSaveOrLoad: false,
      languageStrings: {
         blocklyRobot_lib: {
         label: {
            obstacleInFront: "vor Blume mit Marienkäfer",
            withdrawObject: "pflücke Blume",
            onContainer: "auf Pfad",
         },
         code: {
            obstacleInFront: "vorBlumeMitMarienkaefer",
            withdrawObject: "pflueckeBlume",
            onContainer: "aufPfad",
         }}
      },
      itemTypes: {
         robot: { img: imgPath+"garden_robot.png", side: 80, nbStates: 9, isRobot: true, offsetX: -11, zOrder: 2 },
         earth: { num: 2, img: imgPath+"earth.png", side: 60, isContainer: true, zOrder: 0 },
         flower: { num: 3, img: imgPath+"flower.png", side: 60, isWithdrawable: true, zOrder: 1 },
         flower_mk: { num: 5, img: "flower_marienkaefer.png", side: 60, isObstacle: true, zOrder: 1 },
         number: { num: 6, side: 60, zOrder: 1 },
         bush: { num: 7, img: imgPath+"bush.png", side: 60, isObstacle: false, zOrder: 0 },
         grass: { num: 8, img: "grass.png", side: 60, isObstacle: false, zOrder: 1 },
         tree: { num: 9, img: imgPath+"tree.png", side: 80, isObstacle: false, zOrder: 2, offsetX: -15, offsetY: 8 },
         path: { num: 10, img: "pfad.png", isContainer: true, side: 60, zOrder: 1 }
      },
      //Gibt an, wie viele Blöcke für welche Versionen maimal zur Verfügung stehen
      maxInstructions: {
         easy: 10,
         medium: 15,
         hard: 40,
      },
      //Hier kann angegeben werden, welche Blöcke für die Aufgabe zur Verfügung stehen.
      includeBlocks: {
         //Bei true werden die Blöcke nach Kategorien gruppiert. 
         //Dies kann Sinn ergebene, wenn sehr viele Blöcke zur Verfügung stehen.
         //Dies ist notwendig, wenn Funktionen oder Variablen (zum selber erstellen/nicht vordefiniert) benutzt werden.
         groupByCategory: false,
         //Alle Roboter spezifischen Blocks, welche für die Version jeweils genutzt werden.
         generatedBlocks: {
            robot: {
               easy: ["forward", "withdrawObject", "obstacleInFront"],
               medium: ["forward", "withdrawObject", "obstacleInFront", "backwards", "left", "right"],
               hard: ["forward", "withdrawObject", "obstacleInFront", "backwards", "left", "right", "onContainer"]
            }
         },
         //Allgemeine Blöcke wie Bedingungen und Schleifen.
         standardBlocks: {
            includeAll: false,
            wholeCategories: [],
            singleBlocks: {
               // shared:["controls_repeat"],
               easy: ["controls_if", "logic_negate"],
               medium: ["controls_if_else", "logic_negate", "controls_repeat"],
               hard: ["controls_if_else", "controls_if", "logic_negate", "controls_repeat", "controls_whileUntil"],
            }
         },
         pythonAdditionalFunctions: {
            medium: ["range"],
            hard: ["range"]
         }
      },
      //Wie viele Blumen kann der Roboter maximal pflanzen
      bagInit: {
         count: 200,
         type: "flower"
      },
      checkEndCondition: function (context, lastTurn) {
         var solved = true;
         for (var row = 0; row < context.nbRows; row++) {
            for (var col = 0; col < context.nbCols; col++) {
                  if (context.hasOn(row, col, function (obj) {
                     return obj.isWithdrawable === true;
                   })) {
                     solved = false;
                  }
            }
         }
         if (solved) {
            context.success = true;
               throw ("Bravo, der Roboter hat alle Blumen ohne Marienkäfer geplückt.");
         }
         if (lastTurn) {
            context.success = false;
            throw ("Der Roboter soll alle Blumen, auf denen keine Marienkäfer sitzen pflücken.");
         }
      },
   };

   //Hier werden die Aufgaben definiert
   //Index row und col starten bei 0
   subTask.data = {
      //Version **
      easy: [{
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [7, 7, 7, 7, 7, 7],
            [8, 1, 1, 3, 1, 1],
            [1, 8, 1, 1, 8, 1],
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 1,
            col: 1,
            dir: 0,
            type: "robot"
         }]
      },
      {
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [8, 1, 1, 1, 1, 1],
            [1, 1, 1, 5, 1, 1],
            [7, 7, 7, 7, 7, 7],
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 1,
            col: 1,
            dir: 0,
            type: "robot"
         }]
      }],
      //Version ***
      medium: [{
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [1, 1, 1, 8, 1, 1, 1, 1, 8, 8],
            [1, 3, 5, 3, 5, 3, 5, 5, 3, 1],
            [8, 1, 1, 1, 1, 1, 1, 8, 1, 1],
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 0,
            col: 1,
            dir: 1,
            type: "robot"
         }]
      },
      {
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [1, 1, 8, 1, 1, 1, 1, 8, 8, 8],
            [1, 5, 3, 5, 3, 3, 3, 3, 5, 1],
            [8, 1, 1, 1, 8, 8, 1, 1, 1, 1],
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 0,
            col: 1,
            dir: 1,
            type: "robot"
         }]
      }],
      //Version ****
      hard: [{
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [1, 1, 1, 1, 1, 1, 1, 1, 8, 1],
            [1, 10, 10, 10, 10, 10, 10, 10, 10, 1],
            [1, 3, 5, 3, 5, 3, 3, 5, 3, 1],
            [8, 10, 10, 10, 10, 10, 10, 1, 1, 1],
            [1, 3, 5, 3, 5, 3, 5, 1, 1, 8],
            [1, 1, 1, 1, 1, 1, 8, 1, 8, 1]
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 1,
            col: 1,
            dir: 1,
            type: "robot"
         }]
      },
      {
         //Jede Zahl steht für ein spezifisches Object
         //2 ist zum Beispiel ein Beet
         tiles: [
            [8, 1, 1, 1, 1, 1, 1, 8, 1, 1],
            [1, 10, 10, 10, 10, 10, 10, 1, 1, 1],
            [1, 3, 5, 3, 5, 3, 3, 1, 1, 1],
            [1, 10, 10, 10, 10, 10, 10, 1, 1, 1],
            [1, 3, 5, 3, 5, 3, 5, 1, 1, 8],
            [1, 8, 1, 1, 1, 1, 1, 8, 8, 8]
         ],
         //Definieren, wo der Roboter starten soll
         //dir: Definiert in welche Richtung der Roboter bei Start schaut
         initItems: [{
            row: 1,
            col: 1,
            dir: 1,
            type: "robot"
         }]
      },]
   };

   initBlocklySubTask(subTask);
   displayHelper.thresholdEasy = 5000;
   displayHelper.thresholdMedium = 10000;
}

//Laden der definierten Informationen
//2. Parameter: Die Liste gibt an, welche Versionen es gibt
//3. Parameter: Gibt an bei welcher Version gestartet wird. Bei null wird bei basic gestartet
initWrapper(initTask, ["easy", "medium", "hard"], "easy", true);