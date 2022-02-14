const rFunction1 = (x,y) => {
    return 2 * x + 1 - y;
  };
  
  const rFunction2 = (y,x) => {
    return y - x ** 2;
  };
  
  const eilerMethod = (x0,y0,z0,h,n) => {

    let x,y,z;
    let xArray = [];
    let yArray = [];
    let zArray = [];
  
    for(let i = 0; i < n; i++){
      xArray.push(x0);
      yArray.push(y0);
      zArray.push(z0);

      x = x0 + h;
      y = y0 + h * rFunction1(x0,y0);
      z = z0 + h * rFunction2(y0,x0);

      x0 = x;
      y0 = y;
      z0 = z;


    }
    console.log(xArray,yArray,zArray);
    return [xArray,yArray,zArray];
  
  };
  
  const actionEiler = document.querySelector('#actionEiler');
  
  actionEiler.addEventListener('click', () => {
    let funcInput = Number(document.querySelector("#funEiler").value);
    let nodeInput = Number(document.querySelector("#nodeEiler").value);

    if(funcInput <= 0 || nodeInput < 2 || document.querySelector("#funEiler").value === '' || 
    document.querySelector("#nodeEiler  ").value === ''){
      alert("ОШИБКА!!!");
    }else{
      let xE = eilerMethod(1,2,3,funcInput,nodeInput)[0];
      let yE = eilerMethod(1,2,3,funcInput,nodeInput)[1];
      let zE = eilerMethod(1,2,3,funcInput,nodeInput)[2];
      
      new Chartist.Line('.chart1', {
        labels: xE,
        series: [
          yE
        ]
      }, {
        fullWidth: true,
        showArea: true,
        chartPadding: {
          right: 40
        }
      });
  
      
      new Chartist.Line('.chart2', {
        labels: xE,
        series: [
          zE
        ]
      }, {
        fullWidth: true,
        showArea: true,
        chartPadding: {
          right: 40
        }
      });
    }
  });