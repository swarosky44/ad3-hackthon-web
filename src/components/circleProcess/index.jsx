import { useEffect } from 'react';
import styles from './index.less';

export default (props) => {
  const { angleEnd = 2.9 } = props;

  // 初始化画布 & 参数
  const init = () => {
    const canvas = document.getElementById('circle');
    const ctx = canvas.getContext('2d');

    // 屏幕分辨率
    let ratio = window.devicePixelRatio ? window.devicePixelRatio : 1;
    canvas.width = 360 * ratio;
    canvas.height = 360 * ratio;

    // 初始参数
    const x = 180 * ratio;
    const y = 180 * ratio;
    const radius = 160 * ratio;
    const outerColor = 'rgba(15, 67, 56, 1)';

    // 内环渐变色
    const gradient = ctx.createLinearGradient(0, 360, 0, 0);
    gradient.addColorStop(0, '#43EE96');
    gradient.addColorStop(1, '#45EEC1');

    // 外环旋转角度
    let process = 0;
    const angleStart = 1.5;

    // 动画对象
    let ticker = null;

    // 动画绘制
    let draw = () => {
      if ((angleStart + process) < angleEnd) {
        process += 0.01;
        drawArc({ ctx, x, y, radius, angleStart, process, gradient, ratio });
        ticker = window.requestAnimationFrame(draw);
      } else {
        window.cancelAnimationFrame(ticker);
        draw = null;
      }
    }

    drawCirlce({ ctx, x, y, radius, color: outerColor, ratio });
    ticker = window.requestAnimationFrame(draw);
  };

  // 绘制内环
  const drawArc = ({ ctx, x, y, radius, angleStart, process, gradient, ratio }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, angleStart * Math.PI, (angleStart + process) * Math.PI, false);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 38 * ratio;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  // 绘制外环
  const drawCirlce = ({ ctx, x, y, radius, color, ratio }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 38 * ratio;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={styles.circleWrap}>
      <canvas id="circle" className={styles.circle}>
      </canvas>
      <div className={styles.content}>
        {props.children}
      </div>
    </div>
  );
};
