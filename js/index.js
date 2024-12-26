document.addEventListener("DOMContentLoaded", () => {
  let sensorBtn = document.getElementById("sensor_permission");
  sensorBtn.addEventListener("click", () => {
    if (
      window.DeviceOrientationEvent &&
      window.DeviceOrientationEvent.requestPermission
    ) {
      // 権限付与文の追加
      DeviceOrientationEvent.requestPermission()
        .then((state) => {
          if (state === "granted") {
            window.location.href = "./race.html";
          } else {
            alert("権限の付与に失敗しました。");
          }
        })
        .catch((err) => console.error(err));
    } else {
      window.location.href = "./race.html";
    }
  });
});
