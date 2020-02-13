function clickQuestion_2(){
    $('#middle').html(
        `
        <div id="middle-question-2">
<!--        <img src="images/back-active.png" id="page-back" alt="back"/>                   -->
            <div class="editor">
                  <h5>Please tell us about your problem in detail</h5>
                  <div id="editor">
                        <p>Say Something...</p>
                  </div>
            </div>
        <div class="progress">
            <div class="progress-bar bg-warning progress-bar-striped progress-bar-animated" style="width:50%">40%</div>
        </div>
<!--        <img src="images/next-active.png" id="page-next" alt="next"/>-->
        </div>
        `
    );
    new Quill('#editor', {
        theme: 'snow'
    });
    // $('#page-back').click(clickQuestion);
    // $('#page-next').click(clickQuestion_3);
}
