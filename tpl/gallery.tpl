<!DOCTYPE html>
<html>
<head>
    @include head.incl
    
    <title>Judaica Art by Tsipora - Gallery</title>
    <meta name="description" content="All sculptures by Tsipora Karp with descriptions and details">

    <link rel="stylesheet" href="./css/lightslider.css">
    <link rel="stylesheet" href="./css/gallery.css">
    <link href="https://fonts.googleapis.com/css?family=Halant|Lora:400,700|Tangerine|Allura" rel="stylesheet">

</head>
<body>

    @include header.incl

    <div id="app" class="content"></div>

    <div id="about">
        @include aboutContent.incl
    </div>
    <span class="allura">.</span><span class="tangerine">.</span>

   @include contact.incl

    <script src="./lib/jquery.js"></script>
    <script src="./lib/underscore.js"></script>
    <script src="./lib/backbone.js"></script>
    <script src="./lib/backbone.radio.js"></script>
    <script src="./lib/backbone.marionette.min.js"></script>
    <script src="./js/gallery/templates.js"></script>
    <script src="./js/lightslider.js"></script>
    <script src="./js/gallery/app.js"></script>

    <script src="./js/form.js"></script>
    <script src="./js/gallery.js"></script>
</body>
</html>