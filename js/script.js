var page = 1
var d = new Date();
var getYear = d.getFullYear();
$('#date').html(getYear);
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
                    <div class="col-md-5 col-sm-5 col-5 - mb-4 p-0">
                        <a href="#" class="detail-anime" data-bs-toggle="modal" data-bs-target="#detail-anime"data-id="`+ data.linkId +`">
                            <div class="flexbox-thumb">
                                <img src="`+ data.image +`" class="img">
                                <div class="flexbox-number">`+ no++ +`</div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-7 col-sm-7 col-7">
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
$('#anime-list').on('click','.detail-anime', function () {
    $.ajax({
        url: 'https://api-samehada.herokuapp.com/anime/eps/'+ $(this).data('id'),
        type: 'get',
        dataType: 'json', 
        success: function (eanim) {
            let danime = eanim.detail_anime
            let genres = danime.genres
            let deps = eanim.downloadEps
            $('.modal-body').html(`
            <div class="container p-0">
                <div class="series-flex mt-1">
                    <div class="series-flexleft">
                        <div class="series-thumb">
                            <img src="`+ danime.image +`" alt="">
                        </div>
                    </div>
                    <div class="series-flexright ml-3 mr-3">
                        <div class="series-title text-dark mt-3">
                            <h2 class="text-dark">`+ eanim.title +`</h2>
                        </div>
                        <div class="series-info">
                            <div class="series-titlex">
                                <h3>`+ danime.title +`</h3>
                            </div>
                        </div>
                        <div class="series-synops">
                            <h6 class="m-0" >Synopsis</h6>
                            <p>`+ danime.sinopsis +`</p>
                        </div>
                        <div class="series-genres"></div>
                        <div class="d-anime"></div>
                    </div>
                </div>
            </div>
            `)
            $.each(genres, function (i, genre) {
                $('.series-genres').append(`
                <button class="btn btn-primary mb-2">`+ genre +`</button>
                `)
            })
            $.each(deps, function (i, d_eps) {
                let link = d_eps.data
                let dlink = link[0].quality
                let dlink1 = link[1].quality
                let dlink2 = link[2].quality
                let dlink3 = link[3].quality
                let dnim =link[0].link
                let dnim1 =link[1].link
                let dnim2 =link[2].link
                let dnim3 =link[3].link
                console.log(dlink)
                $('.d-anime').append(`
                <div class="card mb-3">
                    <div class="card-header">
                    `+d_eps.format+`
                    </div>
                    <div class="card-body p-1">
                    <ul class="p-0">
                        <li>
                            <strong class="p-2 mr-3">`+ dlink +` </strong>
                            <span><a target="_blank" href="`+ dnim.gdrive +`" class="nno text-center mr-3" >AceFiles</a></span>
                            <span><a target="_blank" href="`+ dnim.zippyshare +`" class="nno text-center mr-3" >ZippyShare</a></span>
                            <span><a target="_blank" href="`+ dnim.reupload +`" class="nno text-center mr-3" >ReUpload</a></span>
                        </li>
                        <li>
                            <strong class="p-2 mr-3">`+ dlink1 +` </strong>
                            <span><a target="_blank" href="`+ dnim1.gdrive +`" class="nno text-center mr-3" >AceFiles</a></span>
                            <span><a target="_blank" href="`+ dnim1.zippyshare +`" class="nno text-center mr-3" >ZippyShare</a></span>
                            <span><a target="_blank" href="`+ dnim1.reupload +`" class="nno text-center mr-3" >ReUpload</a></span>  
                        </li>
                        <li>
                            <strong class="p-2 mr-3">`+ dlink2 +` </strong>
                            <span><a target="_blank" href="`+ dnim2.gdrive +`" class="nno text-center mr-3" >AceFiles</a></span>
                            <span><a target="_blank" href="`+ dnim2.zippyshare +`" class="nno text-center mr-3" >ZippyShare</a></span>
                            <span><a target="_blank" href="`+ dnim2.reupload +`" class="nno text-center mr-3" >ReUpload</a></span>
                        </li>
                        <li>
                            <strong class="p-2 mr-3">`+ dlink3 +` </strong>
                            <span><a target="_blank" href="`+ dnim3.gdrive +`" class="nno text-center mr-3" >AceFiles</a></span>
                            <span><a target="_blank" href="`+ dnim3.zippyshare +`" class="nno text-center mr-3" >ZippyShare</a></span>
                            <span><a target="_blank" href="`+ dnim3.reupload +`" class="nno text-center mr-3" >ReUpload</a></span>  
                        </li>
                    </ul>
                    </div>
                </div>
                `)
            })
        }
    })
})
$('#back').hide();
$('#next').on('click', function() {
    page++;
    getData()
    $('#back').show();
})
$('#back').on('click', function() {
    page--;
    getData();
    if (page == '1') {
        $('#back').hide();
    }
})
