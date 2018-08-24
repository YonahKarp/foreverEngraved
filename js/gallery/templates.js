var Templates = {}

Templates.gallery = _.template(`
    <div id="currentPieceRegion"></div>
    <div id="fixedSideRegion"></div>
    <div id="fixedBottomRegion" class="fixedFooter"></div>
`);

Templates.currentPiece = _.template(`
    <h2 class="title"><%= currentPiece.title %></h2>
    <div class="flexContainer">
        <div id="detailsRegion" class="half details"></div><div id="imageContainerRegion" class="imagesContainer half"></div>
    </div>
`)

Templates.imageContainer = _.template(`
    <div id="imagesRegion"></div>
    <div class="contactBtn">Inquire About This Piece</div>
`)

Templates.details = _.template(`
    <h2 class="detailsTitle"><%= currentPiece.title %></h2>
    <h2 class="detailsDetails">Details</h2>
    <hr>
    <div class="description"><%= currentPiece.description %></div>
    <div id="specsRegion"></div>
`);


Templates.specs = _.template(`
    <hr>
    <div class="specsHeader"><%= header %>:</div>
    <div class="specValue"><%= value %></div>
`);

Templates.image = _.template(`
    <div class="slide" style="background: url(./img/mid-res2/<%= url %>) center center/contain no-repeat"></div>
`);

Templates.sideImage = _.template(`
    <img class="slide" src="./img/mid-res/<%= images[0].url %>"/>
`)

Templates.bottomImage = _.template(`
<div class="slide" style="background: url(./img/mid-res2/<%= images[0].url %>) center center/contain no-repeat"></div>
`)

Templates.side = _.template(`
    <div class="slide" style="background: url(./img/mid-res2/<%= url %>) center center/contain no-repeat"></div>
`);