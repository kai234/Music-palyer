//播放列表
var music_list =[
        {
            'id':'1',
            'name':'亲爱的',
            'singer':'潘玮柏',
            'duration':'04:10',
            'src':'audio/亲爱的.mp3',
            'images':'img/qinaide.jpg'
        },
        {
            'id':'2',
            'name':'其实',
            'singer':'薛之谦',
            'duration':'04:02',
            'src':'audio/其实.mp3',
            'images':'img/qishi.jpg'
        },
        {
            'id':'3',
            'name':'七夕',
            'singer':'许嵩',
            'duration':'03:54',
            'src':'audio/七夕.mp3',
            'images':'img/haoxiangjiuzheyang.jpg'
        },
        {
            'id':'4',
            'name':'一直',
            'singer':'王筝',
            'duration':'03:52',
            'src':'audio/一直.mp3',
            'images':'img/yizhi.jpg'
        },
        {
            'id':'5',
            'name':'爱着你',
            'singer':'龚淑均',
            'duration':'04:30',
            'src':'audio/爱着你.mp3',
            'images':'img/aizheni.jpg'
        },
        {
            'id':'6',
            'name':'如果没有你',
            'singer':'莫文蔚',
            'duration':'04:48',
            'src':'audio/如果没有你.mp3',
            'images':'img/napa.jpg'
        },
        {
            'id':'7',
            'name':'寂寞烟火',
            'singer':'徐婧汐',
            'duration':'04:33',
            'src':'audio/寂寞烟火.mp3',
            'images':'img/zhiyouyici.jpg'
        },
        {
            'id':'8',
            'name':'想哭',
            'singer':'陈奕迅',
            'duration':'04:04',
            'src':'audio/想哭.mp3',
            'images':'img/eryi.jpg'
        },
        {
            'id':'9',
            'name':'白羊',
            'singer':'海疼',
            'duration':'02:49',
            'src':'audio/白羊.mp3',
            'images':'img/wozaiyebuhuilikaini.jpg'
        },
    ]

var player = e('#player')
var btn_play = e('#btnPlay')
var play_index = 0

var insertMusic = function(element, music, index) {
    var name = music.name
    var duration = music.duration
    var t = `
        <li class='music' data-index=${index}>
            <span class='list_title' data-index=${index}>${name}</span>
            <span class='list_time' data-index=${index}>${duration}</span>
        </li>
    `
    return appendHtml(element, t)
}

// 动态加载播放列表
var loadMusicList = function() {
    var play_list = e('#play_list')
    for (var i = 0; i < music_list.length; i++) {
        var m = music_list[i]
        insertMusic(play_list, m, i)
    }
}

var canplay = function (element, func) {
    bindEvent(element, 'canplay', function(event) {
        func()
    })
}

var loadMusic = function() {
    var music = music_list[play_index]
    var left_photo = e('#left_photo')
    left_photo.src = music.images
    var list_title = e('#list_title')
    list_title.innerHTML = music.name
    var list_singer = e('#list_singer')
    list_singer.innerHTML = music.singer
    player.src = music.src
}

var playMusic = function() {
    player.play()
    btn_play.setAttribute('class','btn_play fa fa-pause')
}

var pauseMusic = function() {
    player.pause()
    btn_play.setAttribute('class','btn_play fa fa-play')
}

var replaceAudio = function () {
    bindAll('.music', 'click', function(event) {
      log('.music')
        var self = event.target
        var index = self.dataset.index
        play_index = index
        loadMusic()
        playMusic()
    })
}

//播放,暂停音乐
var bindEventPlay = function() {
    bindEvent(btn_play, 'click', function(event) {
        if(player.paused){
            playMusic()
        }
        else {
            pauseMusic()
        }
    })
}

//上一曲
var backword = function() {
    if(play_index == 0){
        play_index = music_list.length - 1;
    }
    else{
        play_index--
    }
    loadMusic()
    playMusic()
}

//下一曲
var forward = function() {
    if(play_index == music_list.length - 1){
        play_index = 0
    }
    else{
        play_index++
    }
    loadMusic()
    playMusic()
}

//静音
var volumeOff = function() {
    player.volume=0
    volume_slide.style.width=0
}

//最大音
var volumeUp = function() {
    player.volume=1
    volume_slide.style.width='100%'
}

//时间转换
var translateTime = function (sec) {
    sec = Math.round(sec)
    if (sec > 3600) {
        var hour = parseInt(sec / 3600)
        var hour = zlib(String(hour), 2)
        var minute = parseInt(sec % 3600 / 60)
        var minute = zlib(String(minute), 2)
        var second = zlib(String(sec % 3600 % 60), 2)
        return hour + ':' + minute + ':' + second
    } else {
        var minute = parseInt(sec / 60)
        var minute = zlib(String(minute), 2)
        var second = zlib(String(sec % 60), 2)
        return minute + ':' + second
    }
}

var currentTime = function () {
    var current_time = translateTime(player.currentTime)
    var time = e('#time')
    time.innerHTML = current_time
    var percent = player.currentTime / player.duration
    var process_slide = e('#process_slide')
    process_slide.style.width = percent * 100 + '%'
}

var autoCurrentTime = function () {
    var interval = 100
    setInterval(function(){
        // 每 2s 都会调用这个函数
        currentTime()
    }, interval)
}

//静音
var volumeOff = function() {
    player.volume = 0
    volume_slide.style.width = 0
}

var volumeUp = function() {
    player.volume = 1
    volume_slide.style.width = '100%'
}

var bindEventVolume = function() {
    var volume = e('#volume')
    bindEvent(volume, 'click', function(event) {
        var currentVolume = event.offsetX / this.offsetWidth
        //设置音量
        player.volume = currentVolume
        volume_slide.style.width = currentVolume * 100 + '%'
    })
}

var bindEventProcess = function() {
    var process = e('#process')
    bindEvent(process, 'click', function(event) {
        var currentValue = event.offsetX / this.offsetWidth
        //设置音量
        player.currentTime = player.duration * currentValue
    })
}

var showMusicList = function() {
    var btn_list = e('#btn_list')
    var bz_music = e('#bz_music')
    var play_list_area = e('#play_list_area')
    var showHide = e('#showHide')
    flag = btn_list.dataset.flag
    if (flag == '1') {
        play_list_area.style.display = 'none'
        bz_music.style.width = '500px'
        showHide.style.color = '#666'
        btn_list.setAttribute("data-flag", '0')
    } else {
        play_list_area.style.display = 'block'
        bz_music.style.width = '700px'
        showHide.style.color = '#DDD'
        btn_list.setAttribute("data-flag", '1')
    }
}

// 实现单曲循环播放
var songRepeat = function () {
    bindEvent(a, 'ended', function(event) {
        a.currentTime = 0
        a.play()
    })
}

// 实现循环播放列表
var loopPlayBack = function () {
    bindEvent(player, 'ended', function(event) {
        forward()
    })
}

// 实现随机播放
var randomPlay = function () {
    bindEvent(a, 'ended', function(event) {
        log('random play')
        var randomNum = parseInt(Math.random() * 10)
        log('randomNum = ', randomNum)
        var index = randomNum % songs.length
        log('index = ', index)
        var path = songs[index]
        a.src = path
        canplay(a, function() {
            a.play()
        })
    })
}

var __main = function() {
    loadMusicList()
    player.volume = 0.5
    bindEventPlay()
    autoCurrentTime()
    bindEventVolume()
    bindEventProcess()
    replaceAudio()
    loopPlayBack()
}

__main()
