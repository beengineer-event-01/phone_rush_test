import {
  AnimationMixer,
  Box3,
  Box3Helper,
  BoxGeometry,
  ConeGeometry,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "loaders";

// 各変数、各定数の宣言
// レーンの設定
let index = 1;
const course = [-5, 0, 5];

let mixer;

// エリアの設定
const gravity = 0.05; // 重力

let isOnce = false;
let ios = true;

// オブジェクト
let geometry;
let sphereMaterial;
let model;
let helper;

// プレイヤーの変数定数を宣言
let player;
let playerBox;
let player_v_y = 0;
const initial_velocity = 0.8;
let isJumping = false;
let isMoving = false;
let box_X;
let box_Y;
let box_Z;

// ゴール
let goal;
let goalBoundingBox;

// センサ
let alpha;
let beta;
let gamma;
let aX;
let aY;
let aZ;
let firstZ;

let phone_list = [];
let enemy_list = [];

// シーン
const scene = new Scene();
// カメラ
const camera = new PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.set(0, 4, 10);

// レンダラー
const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// カメラの手動
const controls = new OrbitControls(camera, renderer.domElement);

// ライト
const light = new DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

// texture 内に保存されている jpg のパス
const textureUrls = [
  "textures/ground.jpg", // 道
  "textures/goal.jpg" // ゴール
];

// 読み込む GLB モデルのパス
const glbUrls = [
  "models/player.glb", // プレイヤー
  "models/houses.glb", // 周りの建物
  "models/phone.glb" // スマホ
];

// エリアで用いられる 3D モデルと写真のダウンロード
const textureloader = new TextureLoader();
const glbloader = new GLTFLoader();

// プレイヤーの描画
// ここに記述

// 建物の描画
glbloader.load(
  glbUrls[1],
  function (gltf) {
    for (let i = -40; i <= 40; i++) {
      if (i !== 0) {
        model = gltf.scene.clone();
        model.rotation.set(0, (Math.PI / 2) * Math.sign(i), 0);
        model.position.set(-14 * Math.sign(i), 0, 20 - 10 * Math.abs(i));
        scene.add(model);
      }
    }
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// スマホの描画
// ここに記述

// 障害物の描画
for (let g = 1; g < 12; g++) {
  geometry = new ConeGeometry(1, 4, 32);
  sphereMaterial = new MeshPhongMaterial({ color: 0xff0000 });
  const model = new Mesh(geometry, sphereMaterial);
  const randomIndex = Math.floor(Math.random() * 3);
  model.position.set(course[randomIndex], 2, -15 * (g + 1));
  enemy_list.push(model);
  scene.add(model);
}

// 道の描画
textureloader.load(
  textureUrls[0],
  function (texture) {
    geometry = new BoxGeometry(24, 0.5, 400);
    sphereMaterial = new MeshPhongMaterial();
    sphereMaterial.map = texture;
    const ground = new Mesh(geometry, sphereMaterial);
    ground.position.set(0, -0.3, -180);
    ground.receiveShadow = true;
    scene.add(ground);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// ゴールの描画
// ここに記述

// センサの値の読み取り
document.addEventListener("DOMContentLoaded", function () {
  (aX = 0), (aY = 0), (aZ = 0);
  (alpha = 0), (beta = 0), (gamma = 0);

  // 一度だけ実行
  if (!isOnce) {
    const handleDeviceMotion = (dat) => {
      firstZ = dat.accelerationIncludingGravity.z;
      if (firstZ > 0) {
        ios = false;
      }
      isOnce = true;
      window.removeEventListener("devicemotion", handleDeviceMotion); // リスナーを解除
    };
    window.addEventListener("devicemotion", handleDeviceMotion);
  }

  // 加速度センサの値の取得
  window.addEventListener("devicemotion", (dat) => {
    if (ios) {
      // iOS の時
      // ここに追加
    } else {
      // android の時
      // ここに追加
    }
  });

  // ジャイロセンサの値の取得
  // ここに追加

  // 一定時間ごとに
  let graphtimer = window.setInterval(() => {
    // ここに追加
  }, 33);

  // 描画する関数
  function displayData() {
    let result = document.getElementById("result");
    result.innerHTML =
      "alpha: " +
      alpha.toFixed(2) +
      "<br />" +
      "beta: " +
      beta.toFixed(2) +
      "<br />" +
      "gamma: " +
      gamma.toFixed(2) +
      "<br />" +
      "aX" +
      aX +
      "<br />" +
      "aY" +
      aY +
      "<br />" +
      "aZ" +
      aZ +
      "<br />";
  }
});

// プレイヤーの移動
function move() {
  // ここに追加
}

// プレイヤーのジャンプ
function jump() {
  // ここに追加
}

// 衝突判定
function collision() {
  box_X = 0;
  box_Y = 0;
  box_Z = 0; // サイズが合うように変えてみましょう。
  geometry = new BoxGeometry(box_X, box_Y, box_Z);
  sphereMaterial = new MeshPhongMaterial({ color: 0xff0000 });
  playerBox = new Mesh(geometry, sphereMaterial);
  playerBox.position.set(
    player.position.x,
    player.position.y + box_Y / 2,
    player.position.z
  );
  playerBox.updateWorldMatrix(true, true);
  const playerBoundingBox = new Box3().setFromObject(playerBox);
  helper = new Box3Helper(playerBoundingBox, 0xff0000);
  scene.add(helper);

  // 障害物との衝突
  // ここに追加

  // スマホとの衝突
  // ここに追加

  // ゴールとの衝突
  if (goal) {
    goalBoundingBox = new Box3().setFromObject(goal);
    if (playerBoundingBox.intersectsBox(goalBoundingBox)) {
      console.log("ゴール");
      window.location.href = "./index.html";
    }
  }
}

function animate() {
  const animationId = requestAnimationFrame(animate);

  // Mixer
  // ここに追加

  if (player) {
    // 移動関数の実行
    // ここに追加
    // ジャンプ関数の実行
    // ここに追加
    // 衝突判定関数の実行
    // ここに追加
    // カメラの移動
    // ここに追加
  }
  renderer.render(scene, camera);
}

// サイズ変更
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

animate();