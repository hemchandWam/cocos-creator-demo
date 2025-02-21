
import { _decorator, Component, Node, tween, Vec3, UITransform, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OrbitingNode')
export class OrbitingNode extends Component {
    @property(Node)
    movingNode: Node = null!;

    @property(Button)
    rotateButton: Button = null!;

    private angle: number = 0;
    private radius: number = 200;
    private duration: number = 5;
    private isMoving: boolean = false;

    handleRotateButton() {
        if (!this.isMoving) {
            this.isMoving = !this.isMoving;
            this.startCircularMotion();
        }
    }

    updatePosition() {
        const radian = this.angle * (Math.PI / 180);

        const x = this.radius * Math.cos(radian);
        const y = this.radius * Math.sin(radian);

        this.movingNode.setPosition(new Vec3(x, y, 0));
    }

    startCircularMotion() {
        if (!this.movingNode) return;

        tween(this)
            .repeatForever(
                tween()
                    .to(this.duration, { angle: 360 }, { easing: 'linear' })
                    .call(() => { this.angle = 0 })
                )
            .start();

        this.schedule(this.updatePosition, 0.016);
    }
}