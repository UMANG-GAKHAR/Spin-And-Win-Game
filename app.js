var config = {
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,     
    }
};
var game = new Phaser.Game(config);
function preload ()
{
    this.load.image('background', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/gift-box-bow-bokeh-christmas-hd-wallpaper-wallpaper-list.jpg?token=AIEJHUVLZUNSLVVEIGHOME265CDHM');
    this.load.image('mywheel', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/wheel.png?token=AIEJHUQ3YRJ3TD5OKKQ2UCS65CDL6');
    this.load.image('pin', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/pin.png?token=AIEJHUVO2BG5Q3LMEKJAGLK65DQVE');
    this.load.image('stand', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/stand.png?token=AIEJHUXY62RXXLVBGYWWQZC65DQVW');
    this.load.image('startBtn','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/imagess.jpg?token=AIEJHUSFYCV6IVYGNKDKV2C65CFBE');
    this.load.image('yougot','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/back.jpg?token=AIEJHUX5QOTUCFFYWAEQI7265DL4U');
    this.load.image('try','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/download.jpg?token=AIEJHUXO4AODPVO4PJR6KIK65CEV4');
    this.load.image('restart', 'https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/restart.png?token=AIEJHUTPRGASQSETEX4ABQK65CBRS');
    this.load.audio('sound','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/sound.mp3?token=AIEJHUQ3OVWNLZO3BAZOFFK65CBTI');
    this.load.audio('drum','https://raw.githubusercontent.com/prateeksawhney97/Spin-And-Win-Game-JavaScript/master/Assets/drum.mp3?token=AIEJHUWNNKXYQMDHCQ6MOES65CBYE')
}
function create ()
{
    background=this.add.sprite(400,300,'background');
    this.pin=this.add.sprite(395,70,'pin').setScale(0.25);
    this.pin.depth=1;
    this.stand=this.add.sprite(410,570,'stand').setScale(0.15);
    this.wheel=this.add.sprite(400,300,'mywheel').setScale(0.25).setOrigin(0.5,0.5);
    this.startBtn = this.add.sprite(130,70, 'startBtn').setScale(.50).setInteractive({cursor:'pointer'});
    this.try=this.add.sprite(700,70,'try').setScale(.50);
    this.yougot=this.add.sprite(400,300,'yougot');
    this.yougot.visible=false;
    this.restart=this.add.sprite(400,170,'restart').setScale(0.30);
    this.restart.visible=false;
    this.soundd=this.sound.add('sound');
    this.drum=this.sound.add('drum');
    this.startBtn.on('pointerdown', spinWheel,this);  
}
function spinWheel(){
    this.startBtn.visible=false;
    this.try.visible=false;
    this.sound.play('sound');
    
    let prizes_config = {
        count:12,
        prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","CB Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
    }
    
    let rounds=Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;

    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    let tween = this.tweens.add({
        targets:this.wheel,
        ease: 'Cubic.easeOut',
        angle: rounds*360 + degrees,
        duration: 7000
    })    
    setTimeout(()=>{
        this.sound.play('drum');
        this.pin.visible=false;
        this.yougot.visible=true;
        this.add.text(55,270, `You got ${prizes_config.prize_names[idx]}! Congratulations :D`,{
            fontSize: '40px',
            fontFamily: 'Arial',
            color: 'red',
            backgroundColor:'white'
        });
        this.restart.visible=true;
        this.input.on("pointerdown",restart,this);
    },7000);
    
}
function restart(){
   this.scene.restart();
    
}
