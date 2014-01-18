var tabCount = 0;

$(function () {

  $('#myTab a:first').tab('show');

  $('.nav-tabs').tabdrop();

  registerTabComposeEvent();
  registerTabCloseEvent();
});

function registerTabComposeEvent(){

  $(".composeTab").click(function(e){
      
      var tabId = "tab" + tabCount; //this is id on tab content div where the 
      tabCount = tabCount + 1; //increment compose count

      $('.nav-tabs').append('<li><a href="#' + tabId + '" data-toggle="tab"> <span class="close closeTab">&times;</span>'+$(this).html()+'</a></li>');
      $('.tab-content').append('<div class="tab-pane" id="' + tabId + '"></div>');

      craeteNewTabAndLoadUrl("", "./"+$(this).attr('taburl'), "#" + tabId);

      showTab(tabId);
      registerTabCloseEvent();

      $('.nav-tabs').tabdrop('layout');
  });
}

function registerTabCloseEvent() {

  $(".closeTab").click(function () {
      //there are multiple elements which has .closeTab icon so close the tab whose close icon is clicked
      var tabContentId = $(this).parent().attr("href");
      $(this).parent().parent().remove(); //remove li of tab
      
      $(tabContentId).remove(); //remove respective tab content

      $('.nav-tabs').tabdrop('layout');
  });
}

function showTab(tabId) {
  $('#myTab a[href="#' + tabId + '"]').tab('show');
}

//need change
function craeteNewTabAndLoadUrl(parms, url, loadDivSelector) {

  $("" + loadDivSelector).load(url, function (response, status, xhr) {
    if (status == "error") {
        var msg = "Sorry but there was an error getting details ! ";
        $("" + loadDivSelector).html(msg + xhr.status + " " + xhr.statusText);
        $("" + loadDivSelector).html("Load Ajax Content Here..."+loadDivSelector);
      }
  });
}
