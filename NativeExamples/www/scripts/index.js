﻿(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var mainPage = null;

    function initializeUI() {
        //
        // Define a custom element
        //
        function MyStepperOrRating() {
            ace.NativeObject.call(this, ace.valueOn({
                android: "android.widget.RatingBar",
                ios: "UIStepper"
            }));
        };
        // Inheritance
        MyStepperOrRating.prototype = Object.create(ace.NativeObject.prototype);

        window.myNamespace = { MyStepperOrRating: MyStepperOrRating };

        //    
        // (1) Build the native UI in JavaScript rather than markup:
        //
        mainPage = new ace.Page();
        var listBox = new ace.ListBox();

        addHeader("Markup", listBox);

        listBox.getItems().add("Android XML");
        listBox.getItems().add("iOS XIB");
        listBox.getItems().add("XAML: Cross-Platform");
        listBox.getItems().add("XAML: Android-Specific");
        listBox.getItems().add("XAML: iOS-Specific");
        listBox.getItems().add("XAML: Conditional");

        addHeader("Controls", listBox);

        var button = new ace.Button();
        button.setContent("Button");        
        listBox.getItems().add(button);

        listBox.getItems().add("CommandBar");

        var datePicker = new ace.DatePicker();
        datePicker.setHeader("DatePicker");
        listBox.getItems().add(datePicker);
        
        var hyperlinkButton = new ace.HyperlinkButton();
        hyperlinkButton.setContent("HyperlinkButton");
        hyperlinkButton.setNavigateUri("native://conditional.xaml");      
        listBox.getItems().add(hyperlinkButton);
        
        var image = new ace.Image();
        image.setSource("www/images/ace.png");
        listBox.getItems().add(image);
        
        var textBlock = new ace.TextBlock();
        textBlock.setText("TextBlock");
        textBlock.setForeground("orange");
        textBlock.setFontSize(36);
        textBlock.setFontWeight("bold");
        listBox.getItems().add(textBlock);
        
        listBox.getItems().add("TabBar");        

        var timePicker = new ace.TimePicker();
        timePicker.setHeader("TimePicker");
        listBox.getItems().add(timePicker);
        
        var toggleSwitch = new ace.ToggleSwitch();
        toggleSwitch.setHeader("ToggleSwitch");
        listBox.getItems().add(toggleSwitch);

        addHeader("Custom Native Code", listBox);

        listBox.getItems().add("Get Next Prime");
        listBox.getItems().add("Is Prime?");

        addHeader("Layout", listBox);

        listBox.getItems().add("Canvas");
        listBox.getItems().add("StackPanel");
        listBox.getItems().add("StackPanel (Orientation=Horizontal)");
        listBox.getItems().add("Grid");
        listBox.getItems().add("Grid (RowSpan, ColumnSpan)");
        listBox.getItems().add("StackPanel + Margins");
        listBox.getItems().add("StackPanel + Horizontal Alignment");
        listBox.getItems().add("StackPanel + Vertical Alignment");
        listBox.getItems().add("Grid + Margins");
        listBox.getItems().add("Grid + Center/Center Alignment");
        listBox.getItems().add("Grid + Bottom/Right Alignment");

        addHeader("Styling", listBox);

        listBox.getItems().add("Styling in JavaScript");

        addHeader("Vector Graphics", listBox);

        var path = new ace.Path();
        path.setHeight(49);
        path.setStroke("red");
        path.setStrokeThickness(10);
        path.setData("M1,1 C 14,5 4,12 13,20 C 19,25 28,23 37,20 C 41,18 45,16 49,16 C 54,15 59,14 64,14 C 66,14 69,14 71,14 C 74,15 75,20 78,21 C 81,22 84,23 87,23 C95.8482,23.6667 103.631,16.59 107.333,7.33333 C108.392,4.68786 113.099,3.73099 117,10.6667 C119.884,15.7932 116.039,25.3506 122,28 C124.8,29.2443 127.853,29.3333 131,29.3333 C135.459,29.3333 135.142,23.8538 138.333,19.3333 C141.459,14.9056 148.459,13.2078 152.667,9 C157.206,4.46104 150.866,1.37382 161.667,14.6667 C166.019,20.0233 170.024,25.5044 173.667,31.3333 C174.735,33.0432 176.621,33.4156 178.667,34 C189.337,37.0486 191.038,32.0254 201.667,25.3333 C204.916,23.2875 207.981,21.2646 211,19 C213.834,16.8743 210.206,13.6413 215.333,14.6667 C226.906,16.9813 229.203,15.4595 237.667,25.3333 C240.485,28.6217 238.906,34.3333 243.667,34.3333 C250.634,34.3333 253.673,33.7076 255.333,43.6667 C255.577,45.1287 275.649,39.0088 279.667,37 C283.422,35.1222 285.906,31.7956 290,30.3333 C295.124,28.5034 301.248,28.1889 306.667,27.3333 C317.089,25.6877 316.74,26.0016 324,16.6667 C324.243,16.3548 337.008,-3.28287 339,8.66667 C339.776,13.3257 341.577,17.7949 342.333,22.3333 C342.954,26.0598 344.137,27.2577 349.333,28 C356.105,28.9674 362.321,34.015 368.667,35.6667");
        listBox.getItems().add(path);

        ace.load("native://vector-graphics.xaml", function (root) {
            listBox.getItems().add(root);
            listBox.getItems().add("");
            listBox.getItems().add("");
        });

        listBox.addEventListener("selectionchanged", onSelectionChanged);
        
        mainPage.setContent(listBox);

        //    
        // (2) Replace the WebView with the native content
        //
        ace.getHostPage().setContent(mainPage);

        // Another option, if you want a visible transition:
        // ace.navigate(mainPage);
    }
    
    function onSelectionChanged(sender, item, index) {

        var popup = null;
        if (ace.platform == "iOS") {
            // A simple back button in a popup
            var homeButton = new ace.Button();
            homeButton.setContent("Back");
            homeButton.setBackground("#afff");
            homeButton.addEventListener("click", function() {
                ace.goBack(); 
            });
            
            popup = new ace.Popup();
            popup.setContent(homeButton);
            popup.setRect({x:0,y:0,width:60,height:40});
        }
            
        function callback(newElement) {
            if (newElement) {
                ace.navigate(newElement);
                if (popup) {
                    popup.show();
                }
            }
        }
            
        switch (index) {
            case 1:
                loadAndroidXml(callback);
                break;
            case 2:
                loadiOSXIB(callback);
                break;
            case 3:
                loadNormalXaml(callback);
                break;
            case 4:
                loadAndroidXaml(callback);
                break;
            case 5:
                loadiOSXaml(callback);
                break;
            case 6:
                loadConditionalXaml(callback);
                break;
            case 9:
                toggleCommandBar(mainPage);
                break;
            case 14:
                toggleTabBar(mainPage);
                break;
            case 18:
                doNextPrime();
                break;
            case 19:
                doIsPrime();
                break;
            case 21:
                doCanvas(callback);
                break;
            case 22:
                doStackPanel(false, false, callback);
                break;
            case 23:
                doStackPanel(true, false, callback);
                break;
            case 24:
                doSimpleGrid(callback);
                break;
            case 25:
                doGrid(null, null, false, callback);
                break;
            case 26:
                doStackPanel(false, true, callback);
                break;
            case 27:
                doStackPanelAlignment(false, callback);
                break;
            case 28:
                doStackPanelAlignment(true, callback);
                break;
            case 29:
                doGrid(null, null, true, callback);
                break;
            case 30:
                doGrid("center", "center", false, callback);
                break;
            case 31:
                doGrid("right", "bottom", false, callback);
                break;
            case 33:
                doStyle(callback);
                break;
            default:
                return;
        }
    }

    function addHeader(txt, listBox) {
        var tb = new ace.TextBlock();
        tb.setText("    " + txt);
        if (ace.platform == "Android") {
            tb.setHeight(48);
            tb.setFontSize(16);
            tb.setPadding("0,12,0,0");
        }
        tb.setForeground("blue");
        tb.setFontWeight("bold");
        listBox.getItems().add(tb);
    }

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // Cordova has been loaded. Perform any initialization that requires Cordova here.
        initializeUI();
    };

    function onPause() {
    };

    function onResume() {
    };
} )();