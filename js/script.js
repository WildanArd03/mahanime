var page = 1
function getData() {
    $('#anime-list').html('');
    $.ajax({
        url: 'https://api-samehada.herokuapp.com/page/' + page,
        type: 'get',
        dataType: 'json',
        success: function (result) {
            let anime = result.latest
            no = 1
            $.each(anime, function (i, data) {
                if (no == '15') {
                    return false
                }
            $('#anime-list').append(`
            <div class="col-md-6 mb-4">
                <div class="row">
                    <div class="col-md-4 mb-4 p-0">
                        <a href="#" class="detail-anime" data-bs-toggle="modal" data-bs-target="#detail-anime"data-id="`+ data.id +`">
                            <div class="flexbox-thumb">
                                <img src="`+ data.image +`" class="img-fluid">
                                <div class="flexbox-number">`+ no++ +`</div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-6">
                        <div class="flexbox3-side">
                            <div class="title">`+ data.title +`</div>
                            <div class="chapter">Episode : `+ data.episode +`</div>
                            <div class="chapter">Released on : `+ data.release_time +`</div>
                        </div>
                    </div>
                </div>
            </div>
            `)
            })
        }
    })   
}
getData()
$('#back').hide();
$('#next').on('click', function() {
    page++;
    getData();
    $('#back').show();
})
$('#back').on('click', function() {
    page--;
    getData();
    if (page == '1') {
        $('#back').hide();
    }
    
})