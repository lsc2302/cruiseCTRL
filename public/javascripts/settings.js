$(document).ready(function() {
   $('#settings-back').click(function(){
       if (document.referrer === '') {
           window.location.href = '/';
       }
       window.location.href = document.referrer;
   })
});
