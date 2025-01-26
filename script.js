const prizes = [
    '0.024ETH', '3TRUMP', '0.22SOL', '15XRP',
    '270TRX', '0.07BNB', '1OKB', '170DOGE'
];

// 获取页面元素
const drawButton = document.getElementById('draw-btn');
const resultPopup = document.getElementById('result-popup');
const resultText = document.getElementById('result-text');
const gridItems = document.querySelectorAll('.grid-item:not(.center)');

// 定义状态变量
let isSpinning = false;
let currentIndex = -1;

function resetGrids() {
    gridItems.forEach(item => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
        item.style.transition = 'all 0.15s ease';
    });
}

function highlightGrid(index) {
    resetGrids();
    const item = gridItems[index];
    // 保持原有背景色，只改变缩放和阴影效果
    item.style.transform = 'scale(1.1)';
    item.style.boxShadow = '0 0 20px rgba(196, 167, 125, 0.5)';
    item.style.border = '2px solid #C4A77D';
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    
    let step = 0;
    const minSpeed = 50;    // 最快速度
    const maxSpeed = 300;   // 最慢速度
    let currentSpeed = minSpeed;
    const totalSteps = 40;  // 总步数
    const acceleration = 1.3; // 加速因子
    
    // 随机选择最终停止位置
    const finalPosition = Math.floor(Math.random() * 8);
    
    function rotate() {
        // 更新当前位置
        currentIndex = (currentIndex + 1) % 8;
        highlightGrid(currentIndex);
        
        step++;
        
        // 速度控制
        if (step < totalSteps / 4) {
            // 前1/4圈加速
            currentSpeed = Math.max(minSpeed, currentSpeed / acceleration);
        } else if (step > totalSteps * 0.6) {
            // 后40%减速
            currentSpeed = Math.min(maxSpeed, currentSpeed * acceleration);
        }
        
        // 判断是否继续旋转
        if (step < totalSteps || currentIndex !== finalPosition) {
            setTimeout(rotate, currentSpeed);
        } else {
            // 抽奖结束
            isSpinning = false;
            const prize = prizes[finalPosition];
            
            // 最终高亮效果
            const finalItem = gridItems[finalPosition];
            finalItem.style.transition = 'all 0.3s ease';
            finalItem.style.transform = 'scale(1.15)';
            finalItem.style.boxShadow = '0 0 30px rgba(196, 167, 125, 0.7)';
            finalItem.style.border = '2px solid #C4A77D';
            
            // 显示结果
            resultText.textContent = `Congratulations on winning the ${prize}！`;
            resultPopup.classList.add('show');
            
            // 3秒后重置
            setTimeout(() => {
                resultPopup.classList.remove('show');
                resetGrids();
                // 重置边框
                finalItem.style.border = '1px solid rgba(196, 167, 125, 0.3)';
            }, 3000);
        }
    }
    
    rotate();
}

// 添加按钮效果
drawButton.addEventListener('mousedown', () => {
    drawButton.style.transform = 'scale(0.95)';
});

drawButton.addEventListener('mouseup', () => {
    drawButton.style.transform = 'scale(1)';
});

drawButton.addEventListener('click', spin);

// 初始化样式
gridItems.forEach(item => {
    item.style.transition = 'all 0.15s ease';
});