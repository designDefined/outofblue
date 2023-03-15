import styles from "./Books.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import cover_outOfBlue from "public/assets/background/books/book_outofBlue/cover_main.png";
import front_outOfBlue from "public/assets/background/books/book_outofBlue/cover_front.png";
import back_outOfBlue from "public/assets/background/books/book_outofBlue/cover_back.png";
import page1_outOfBlue from "public/assets/background/books/book_outofBlue/page1.png";
import page2_outOfBlue from "public/assets/background/books/book_outofBlue/page2.png";
import page3_outOfBlue from "public/assets/background/books/book_outofBlue/page3.png";
import page4_outOfBlue from "public/assets/background/books/book_outofBlue/page4.png";
import page5_outOfBlue from "public/assets/background/books/book_outofBlue/page5.png";
import page6_outOfBlue from "public/assets/background/books/book_outofBlue/page6.png";
import page7_outOfBlue from "public/assets/background/books/book_outofBlue/page7.png";
import page8_outOfBlue from "public/assets/background/books/book_outofBlue/page8.png";
import { read } from "fs";

const cx = classNames.bind(styles);

type BookData = {
  id: number;
  cover: StaticImageData;
  title: string;
  subTitle: string;
  content: string;
  pages: StaticImageData[];
};

const outOfBluePreview = [
  front_outOfBlue,
  back_outOfBlue,
  page1_outOfBlue,
  page2_outOfBlue,
  page3_outOfBlue,
  page4_outOfBlue,
  page5_outOfBlue,
  page6_outOfBlue,
  page7_outOfBlue,
  page8_outOfBlue,
];

const data: BookData[] = [
  {
    id: 0,
    cover: cover_outOfBlue,
    title: "아웃오브블루\nOut of Blue",
    subTitle: "단상집 01",
    content:
      "떠오르는 대로의 단편적인 생각들을 모은 '아웃오브블루'의 첫 단상집\n" +
      "\n" +
      "경계를 열어두고 다양한 분야에서 창작 활동을 하는 아웃오브블루의 삶과 가장 밀접한 글이자,\n" +
      "누구나 일상 속에서 공감할 수 있는 위트와 철학이 담긴 시적 에세이",
    pages: outOfBluePreview,
  },
  /*
  {
    id: 1,
    cover: cover_outOfBlue,
    title: "아웃오브블루\nOut of Blue",
    subTitle: "단상집 01",
    content:
      "떠오르는 대로의 단편적인 생각들을 모은 '아웃오브블루'의 첫 단상집\n" +
      "\n" +
      "경계를 열어두고 다양한 분야에서 창작 활동을 하는 아웃오브블루의 삶과 가장 밀접한 글이자,\n" +
      "누구나 일상 속에서 공감할 수 있는 위트와 철학이 담긴 시적 에세이",
    pages: outOfBluePreview,
  },
  {
    id: 2,
    cover: cover_outOfBlue,
    title: "아웃오브블루\nOut of Blue",
    subTitle: "단상집 01",
    content:
      "떠오르는 대로의 단편적인 생각들을 모은 '아웃오브블루'의 첫 단상집\n" +
      "\n" +
      "경계를 열어두고 다양한 분야에서 창작 활동을 하는 아웃오브블루의 삶과 가장 밀접한 글이자,\n" +
      "누구나 일상 속에서 공감할 수 있는 위트와 철학이 담긴 시적 에세이",
    pages: outOfBluePreview,
  },
  */
];
export default function Books() {
  const [displayBubble, setDisplayBubble] = useState(false);
  const [currentBook, setCurrentBook] = useState<BookData | null>(null);
  const [reading, setReading] = useState<number | false>(false);
  return (
    <main className={cx("main")}>
      <div className={cx("content")}>
        <div
          className={cx("coverButton")}
          onClick={() => {
            setDisplayBubble(true);
          }}
        />
      </div>
      {displayBubble && (
        <div
          className={cx("bubbleWrapper")}
          onClick={() => {
            setDisplayBubble(false);
          }}
        >
          <div
            className={cx("list")}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {data.map((book) => (
              <div key={book.id} className={cx("listItem")}>
                <div className={cx("coverWrapper")}>
                  <Image
                    src={book.cover}
                    alt={`Album cover of ${book.title}`}
                    quality={10}
                    fill
                  />
                  <div
                    className={cx("bookOverlay", {
                      on: currentBook?.id === book.id,
                    })}
                    onClick={() => {
                      setCurrentBook(book);
                      setReading(0);
                    }}
                  >
                    {currentBook?.id === book.id ? "계속 읽기" : "읽기"}
                  </div>
                </div>
                <div className={cx("textWrapper")}>
                  <div className={cx("subTitle")}>{book.subTitle}</div>
                  <div className={cx("title")}>{book.title}</div>
                  <div className={cx("text")}>{book.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {reading !== false ? (
        <div
          className={cx("readingWrapper")}
          onClick={() => {
            setReading(false);
          }}
        >
          {currentBook ? (
            <>
              <button
                className={cx("pageButton", { active: reading > 0 })}
                onClick={(e) => {
                  setReading(reading - 1);
                  e.stopPropagation();
                }}
              >
                이전
              </button>
              <div
                className={cx("pageWrapper")}
                onClick={(e) => e.stopPropagation()}
              >
                {reading * 2 < currentBook.pages.length && (
                  <Image
                    src={currentBook.pages[reading * 2]}
                    alt={`${currentBook.title} page ${reading * 2 + 1}`}
                    objectFit={"contain"}
                    fill
                  />
                )}
              </div>
              <div
                className={cx("pageWrapper", "pcOnly")}
                onClick={(e) => e.stopPropagation()}
              >
                {reading * 2 + 1 < currentBook.pages.length && (
                  <Image
                    src={currentBook.pages[reading * 2 + 1]}
                    alt={`${currentBook.title} page ${reading * 2 + 2}`}
                    objectFit={"contain"}
                    fill
                  />
                )}
              </div>
              <button
                className={cx("pageButton", {
                  active: reading + 1 < currentBook.pages.length / 2,
                })}
                onClick={(e) => {
                  setReading(reading + 1);
                  e.stopPropagation();
                }}
              >
                다음
              </button>
            </>
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div />
      )}
    </main>
  );
}
