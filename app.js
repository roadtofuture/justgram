const http = require("http");
const express = require("express"); //모듈가지고 오기
const app = express(); //할당
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  //배열 안의 객체들을 가져올때는 req.body
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

// app.use(express.json());

// app.get("/ping", (req, res) => {
//   res.json({ message: "pong" });
// });

//
// M1: 회원가입(pseudo-code - 가짜 코드 (글자로 적는것))

// 1. app에 회원가입하는 URL등록

app.post("/join", (req, res) => {
  // 2. Name, email, password received from 요청(request)

  const { email, password, name } = req.body;

  // 3. users 배열에 고객 추가

  const userData = {
    id: 3,
    name,
    email,
    password,
  };

  users.push(userData);

  // 4. 응답(response) to client
  res.json({ message: "USER_CREATED" });
});

// M2: 게시글 등록하기

//1. app posting URL
app.post("/postList", (req, res) => {
  //2. Receive data from client : 'title', 'content', 'userID'

  const { title, content, userId } = req.body;

  //3. Push data into array posts

  const postingData = {
    title,
    content,
    userId,
  };

  posts.push(postingData);

  //4. Send response to client

  res.status(201).json({ message: "postCreated" }); //status 200 이 dafault.
});

// M3: 게시글 목록 조회하기

// 1. app posting list get URL
app.get("/postList", (req, res) => {
  // 2. Option 1
  // data 형태를 직접 만들어서, res.json()으로 보내주기

  res.status(200).json({
    //"data"가 key이고 배열이 value임 . 통째로 배열을 res.body에 실어보내는 데이터
    data: [
      {
        userID: 1,
        userName: "Rebekah Johnson",
        postingId: 1,
        postingTitle: "간단한 HTTP API 개발 시작!",
        postingContent:
          "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
      },
      {
        userID: 2,
        userName: "Fabian Predovic",
        postingId: 2,
        postingTitle: "HTTP의 특성",
        postingContent: "Request/Response와 Stateless!!",
      },
      {
        userID: 3,
        userName: "new user 1",
        postingId: 3,
        postingTitle: "내용 1",
        postingContent: "sampleContent3",
      },
      {
        userID: 4,
        userName: "new user 2",
        postingId: 4,
        postingTitle: "내용 2",
        postingContent: "sampleContent4",
      },
    ],
  });

  // Option 2
  // array를 가공해서 형태에 맞는 데이터를 만든다.

  // const getPost = (req, res) => {
  //   const data = [];

  //   for (let i = 0; i < post.length; i++) {
  //     let username = "";
  //     if (users[i].id === Number(posts[i].userId)) {
  //       username =users[i].name;
  //       console.log(userName);
  //     }
  //     data.push({
  //       userID: posts[i].userId,
  //       userName: userName,
  //       postingId: posts[i].id,
  //       postingTitle: posts[i].title
  //       postingContent: posts[i].content,
  //     })
  //   }
  // }
});

//M4: 게시글 수정하기

// 1. app 수정 url 등록
app.patch("/postList", (req, res) => {
  // 2. 1번이라는 숫자를 변수에 할당.
  const id = 1;
  // 3. posts라는 배열에서, id가 1번인 객체를 찾음.

  for (let i = 0; i < posts.length; i++) {
    const posting = posts[i];
    //만약 post라는 객체의id 가 1번이라면,
    // 4. 'content'를 "노드"로 바꾼다.
    if (posting.id === 1) {
      posting.content = "노드";
    }
  }

  // 5. send response to client

  res.status(200).json({ data: posts });
});

const server = http.createServer(app);

try {
  server.listen(8000, () => {
    console.log("server is listening on PORT 8000");
  });
} catch (err) {
  console.log(err);
}

// M5. 게시글 삭제하기

// 1. app 삭제 url 등록
app.delete("/postDelete", (req, res) => {
  //2. Receive data from client : 'title', 'content', 'userID'

  const { title, content, userId } = req.body;

  //3. Push data into array posts

  const postingData = {
    title,
    content,
    userId,
  };

  posts.pop(postingData);

  //4. Send response to client

  res.status(201).json({ message: "postingDeleted" }); //status 200 이 dafault.
});

// M6. 유저와 게시글 조회하기

// 1. app posting list get URL
app.get("/userpostList", (req, res) => {
  // Option 2
  // array를 가공해서 형태에 맞는 데이터를 만든다.

  const getPostlist = (req, res) => {
    const data = [];

    for (let i = 0; i < post.length; i++) {
      let username = "";
      if (users[i].id === Number(posts[i].userId)) {
        username = users[i].name;
      }
      data.push({
        userID: posts[i].userId,
        userName: userName,
        postings: {
          postingId: posts[i].id,
          postingName: posts[i].title,
          postingContent: posts[i].content,
        },
      });
    }
  };
});
