function loadAndroidXml(callback) {
    // document.location.href = "android://android_sample.xml";
    ace.load("android://android_sample.xml", function(root) {
        callback(root);
    });
}

function loadiOSXIB(callback) {
    // document.location.href = "ios://ios_sample.xib";
    ace.load("ios://ios_sample.xib", function(root) {
        callback(root);
    });
}

function loadNormalXaml(callback) {
    // document.location.href = "native://grid.xaml";
    ace.load("native://grid.xaml", function (root) {
        callback(root);
    });
}

function loadAndroidXaml(callback) {
    // document.location.href = "native://android.xaml";
    ace.load("native://android.xaml", function(root) {
        callback(root);
    });
}

function loadiOSXaml(callback) {
    // document.location.href = "native://ios.xaml";
    ace.load("native://ios.xaml", function(root) {
        callback(root);
    });
}

function loadConditionalXaml(callback) {
    // document.location.href = "native://conditional.xaml";
    ace.load("native://conditional.xaml", function(root) {
        callback(root);
    });
}

function toggleCommandBar(page) {
    if (!page.getBottomAppBar()) {
        var commandBar = new ace.CommandBar();

        var b1 = new ace.AppBarButton();
        var b2 = new ace.AppBarButton();

        b1.setLabel("Play");
        b1.setIcon("Play");
        b1.addEventListener("click", function () { alert("Clicked Play"); });

        b2.setLabel("Stop");
        b2.setIcon("Stop");
        b2.addEventListener("click", function () { alert("Clicked Stop"); });

        // CommandBar's "content property" maps to a PrimaryCommands property.
        // Therefore, to add children, we get the PrimaryCommands collection:
        commandBar.getPrimaryCommands().add(b1);
        commandBar.getPrimaryCommands().add(b2);

        page.setBottomAppBar(commandBar);
    }
    else {
        page.setBottomAppBar(null);
    }

    // Temporary workaround for refreshing app bars:
    ace.getHostPage().setContent(page);
}

function toggleTabBar(page) {
    if (!page.getBottomAppBar()) {
        var tabBar = new ace.TabBar();            

        var b1 = new ace.AppBarButton();
        var b2 = new ace.AppBarButton();

        b1.setLabel("Tab 1");
        b1.setIcon("www/images/tab1-{platform}.png");

        b2.setLabel("Tab 2");
        b2.setIcon("www/images/tab2-{platform}.png");
        b2.addEventListener("click", function () { alert("Clicked Tab 2"); });

        // TabBar's "content property" maps to a PrimaryCommands property.
        // Therefore, to add children, we get the PrimaryCommands collection:
        tabBar.getPrimaryCommands().add(b1);
        tabBar.getPrimaryCommands().add(b2);

        page.setBottomAppBar(tabBar);
    }
    else {
        page.setBottomAppBar(null);
    }

    // Temporary workaround for refreshing app bars:
    ace.getHostPage().setContent(page);
}

function doNextPrime() {
    // Vary the string based on the current platform
    var className = ace.valueOn({ android: "mypackage.MyAlgorithm", ios: "MyAlgorithm" });

    if (!window.myAlgorithmInstance) {
        // Create an instance of the native class
        window.myAlgorithmInstance = new ace.NativeObject(className);

        // Invoke an instance method with one parameter and no return value
        window.myAlgorithmInstance.invoke("setStartingNumber", 100);
    }

    // Invoke an instance method with no parameters and a return value
    window.myAlgorithmInstance.invoke("getNextPrime", function (result) {
        alert(result);
    });
}

function doIsPrime() {
    // Vary the string based on the current platform
    var className = ace.valueOn({ android: "mypackage.MyAlgorithm", ios: "MyAlgorithm" });

    // Invoke a static method with one parameter
    ace.NativeObject.invoke(className, "isPrime", 19, function (result) { alert("Is 19 prime? " + result); });
}

function doCanvas(callback) {
    //
    // Create Buttons
    //        
    var b1 = new ace.Button();
    b1.setBackground("red");
    b1.setFontSize(30);
    b1.setContent("0,0 (default)");

    var b2 = new ace.Button();
    b2.setBackground("orange");
    b2.setFontSize(30);
    b2.setContent("100,100");

    var b3 = new ace.Button();
    b3.setBackground("yellow");
    b3.setFontSize(30);
    b3.setContent("0,300");

    //
    // Configure Canvas-specific "attached properties"
    //
    ace.Canvas.setLeft(b2, 100);
    ace.Canvas.setTop(b2, 100);

    ace.Canvas.setTop(b3, 300);

    //
    // Add the Buttons to the Canvas
    //
    var canvas = new ace.Canvas();

    canvas.getChildren().add(b1);
    canvas.getChildren().add(b2);
    canvas.getChildren().add(b3);

    callback(canvas);
}

function doStackPanel(isHorizontal, addMargins, callback) {
    //
    // Create Buttons
    //        
    var b1 = new ace.Button();
    b1.setBackground("red");
    b1.setFontSize(30);
    b1.setContent("1");

    var b2 = new ace.Button();
    b2.setBackground("orange");
    b2.setFontSize(30);
    b2.setContent("2");

    var b3 = new ace.Button();
    b3.setBackground("yellow");
    b3.setFontSize(30);
    b3.setContent("3");

    //
    // Add the Buttons to the StackPanel
    //
    var stackPanel = new ace.StackPanel();

    if (isHorizontal) {
        stackPanel.setOrientation("horizontal");
    }

    if (addMargins) {
        b1.setMargin(20);
        b2.setMargin(20);
        b3.setMargin(20);
    }

    stackPanel.getChildren().add(b1);
    stackPanel.getChildren().add(b2);
    stackPanel.getChildren().add(b3);

    callback(stackPanel);
}

function doSimpleGrid(callback) {
    //
    // Create Buttons
    //
    var buttons = [];

    var b1 = new ace.Button();
    b1.setContent("0,0");
    b1.setBackground("Red");
    buttons.push(b1);

    var b2 = new ace.Button();
    b2.setContent("0,1");
    b2.setBackground("Orange");
    buttons.push(b2);

    var b3 = new ace.Button();
    b3.setContent("0,2");
    b3.setBackground("Yellow");
    buttons.push(b3);

    var b4 = new ace.Button();
    b4.setContent("1,0");
    b4.setBackground("Green");
    buttons.push(b4);

    var b5 = new ace.Button();
    b5.setContent("1,1");
    b5.setBackground("Aqua");
    buttons.push(b5);

    var b6 = new ace.Button();
    b6.setContent("1,2");
    b6.setBackground("SteelBlue");
    buttons.push(b6);

    var b7 = new ace.Button();
    b7.setContent("2,0");
    b7.setBackground("Purple");
    buttons.push(b7);

    var b8 = new ace.Button();
    b8.setContent("2,1");
    b8.setBackground("Brown");
    buttons.push(b8);

    var b9 = new ace.Button();
    b9.setContent("2,2");
    b9.setBackground("Gray");
    buttons.push(b9);

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setFontSize(30);
    }

    //
    // Define a 3x3 Grid with a larger middle row/column
    //
    var grid = new ace.Grid();

    grid.getRowDefinitions().add(new ace.RowDefinition());
    grid.getRowDefinitions().add(new ace.RowDefinition("2*"));
    grid.getRowDefinitions().add(new ace.RowDefinition());

    grid.getColumnDefinitions().add(new ace.ColumnDefinition());
    grid.getColumnDefinitions().add(new ace.ColumnDefinition("2*"));
    grid.getColumnDefinitions().add(new ace.ColumnDefinition());

    //
    // Configure Grid-specific "attached properties"
    //
    ace.Grid.setColumn(b2, 1);
    ace.Grid.setColumn(b3, 2);
    ace.Grid.setRow(b4, 1);
    ace.Grid.setRow(b5, 1);
    ace.Grid.setColumn(b5, 1);
    ace.Grid.setRow(b6, 1);
    ace.Grid.setColumn(b6, 2);
    ace.Grid.setRow(b7, 2);
    ace.Grid.setRow(b8, 2);
    ace.Grid.setColumn(b8, 1);
    ace.Grid.setRow(b9, 2);
    ace.Grid.setColumn(b9, 2);

    //
    // Add the Buttons to the Grid
    //
    for (var i = 0; i < buttons.length; i++) {
        grid.getChildren().add(buttons[i]);
    }

    callback(grid);
}

function doGrid(horizontalAlignment, verticalAlignment, addMargins, callback) {
    //
    // Create Buttons
    //
    var buttons = [];

    var b1 = new ace.Button();
    b1.setContent("0,0");
    b1.setBackground("Red");
    buttons.push(b1);

    var b3 = new ace.Button();
    b3.setContent("0,2");
    b3.setBackground("Yellow");
    buttons.push(b3);

    var b4 = new ace.Button();
    b4.setContent("1,0");
    b4.setBackground("Green");
    buttons.push(b4);

    var b5 = new ace.Button();
    b5.setContent("1,1");
    b5.setBackground("Aqua");
    buttons.push(b5);

    var b6 = new ace.Button();
    b6.setContent("1,2");
    b6.setBackground("SteelBlue");
    buttons.push(b6);

    var b7 = new ace.Button();
    b7.setContent("2,0");
    b7.setBackground("Purple");
    buttons.push(b7);

    var b8 = new ace.Button();
    b8.setContent("2,1");
    b8.setBackground("Brown");
    buttons.push(b8);

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].setFontSize(30);
        if (horizontalAlignment)
            buttons[i].setHorizontalAlignment(horizontalAlignment);
        if (verticalAlignment)
            buttons[i].setVerticalAlignment(verticalAlignment);
        if (addMargins)
            buttons[i].setMargin(20);
    }

    //
    // Define a 3x3 Grid with a larger middle row/column
    //
    var grid = new ace.Grid();

    grid.getRowDefinitions().add(new ace.RowDefinition());
    grid.getRowDefinitions().add(new ace.RowDefinition("2*"));
    grid.getRowDefinitions().add(new ace.RowDefinition());

    grid.getColumnDefinitions().add(new ace.ColumnDefinition());
    grid.getColumnDefinitions().add(new ace.ColumnDefinition("2*"));
    grid.getColumnDefinitions().add(new ace.ColumnDefinition());

    //
    // Configure Grid-specific "attached properties"
    //
    ace.Grid.setColumnSpan(b1, 2);
    ace.Grid.setColumn(b3, 2);
    ace.Grid.setRow(b4, 1);
    ace.Grid.setRow(b5, 1);
    ace.Grid.setColumn(b5, 1);
    ace.Grid.setRow(b6, 1);
    ace.Grid.setColumn(b6, 2);
    ace.Grid.setRowSpan(b6, 2);
    ace.Grid.setRow(b7, 2);
    ace.Grid.setRow(b8, 2);
    ace.Grid.setColumn(b8, 1);

    //
    // Add the Buttons to the Grid
    //
    for (var i = 0; i < buttons.length; i++) {
        grid.getChildren().add(buttons[i]);
    }

    callback(grid);
}

function doStackPanelAlignment(isHorizontal, callback) {
    var stackPanel = new ace.StackPanel();
    if (isHorizontal) {
        stackPanel.setOrientation("horizontal");
    }

    for (var i = 0; i < 4; i++) {
        var b = new ace.Button();
        b.setFontSize(30);
        b.setBackground("cyan");

        if (isHorizontal) {
            if (i == 0)
                b.setVerticalAlignment("center");
            else if (i == 1)
                b.setVerticalAlignment("top");
            else if (i == 2)
                b.setVerticalAlignment("bottom");
            else if (i == 3)
                b.setVerticalAlignment("stretch");

            b.setContent(b.getVerticalAlignment());
        }
        else {
            if (i == 0)
                b.setHorizontalAlignment("center");
            else if (i == 1)
                b.setHorizontalAlignment("left");
            else if (i == 2)
                b.setHorizontalAlignment("right");
            else if (i == 3)
                b.setHorizontalAlignment("stretch");

            b.setContent(b.getHorizontalAlignment());
        }

        stackPanel.getChildren().add(b);
    }

    callback(stackPanel);
}

function doStyle(callback) {
    var stackPanel = new ace.StackPanel();

    var style = {
        FontWeight: "Bold",
        FontSize: 100,
        Foreground: "LemonChiffon",
        Background: "SteelBlue",
        Height: 200,
        Margin: "100,20"
    };

    for (var i = 0; i < 4; i++) {
        var b = new ace.Button();
        b.setContent(i+1);
        b.setStyle(style);
        stackPanel.getChildren().add(b);
    }

    callback(stackPanel);
}
