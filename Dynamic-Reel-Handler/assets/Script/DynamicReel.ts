import { _decorator, Button, Color, Component, director, instantiate, Label, macro, Node, Prefab, Slider, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DynamicReel")
export class DynamicReel extends Component {

    @property(Node)
    reelContainer: Node = null;

    @property(Prefab)
    cell: Prefab = null;

    @property(Button)
    startReelButton: Button = null;

    @property(Slider)
    frequencySlider: Slider = null;

    private count: number = 0;
    private isRunning: boolean = false;
    private frequency: number = 100;

    onLoad() {
        this.initializeReel();
    }

    initializeReel() {
        for (let i = 0; i < 20; i++) {
            this.creatingCells();
        }
    }

    getRandomColor() {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return new Color(r, g, b);
    }

    creatingCells() {
        this.count += 1;
        let cell = instantiate(this.cell);
        cell.parent = this.reelContainer;
        cell.children[0].getComponent(Label).string = this.count.toString();
        cell.getComponent(Sprite).color = this.getRandomColor();
    }

    toggleReel() {
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            this.runReelContainer();
        } else {
            this.unschedule(this.runReelContainer);
        }
    }

    runReelContainer() {
        if (!this.isRunning) return;
    
        const bottomSprite = this.reelContainer.children[0];
        bottomSprite.active = false;
        bottomSprite.parent = null;

        this.scheduleOnce(() => {
            this.count += 1;
            bottomSprite.parent = this.reelContainer;
            bottomSprite.children[0].getComponent(Label).string = this.count.toString();
            bottomSprite.getComponent(Sprite).color = this.getRandomColor();
            bottomSprite.active = true;
        }, 0.5*(this.frequency / 1000));

        this.scheduleOnce(() => this.runReelContainer(), 1*(this.frequency / 1000));
        // console.log('Frequency:', this.frequency);
    }

    handleFrequencyChangeFromTheSlider(slider: Slider) {
        this.frequency = 100 + (1 - slider.progress) * 900;
        // console.log('Frequency:', this.frequency);
    }
}