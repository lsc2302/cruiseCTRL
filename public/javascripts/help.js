$(document).ready(function() {
   $('#help-back').click(function(){
       if (document.referrer === '') {
           window.location.href = '/';
       }
       else {
           window.location.href = document.referrer;
       }
   })
});
