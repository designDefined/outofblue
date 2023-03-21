import styles from "./Books.module.scss";
import classNames from "classnames/bind";
import { useEffect, useLayoutEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import thumbnail_outOfBlue from "public/assets/background/books/book_outofBlue/thumbnail.png";
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
  thumbnail: StaticImageData;
  pages: StaticImageData[];
  link: string;
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
      "경계를 열어두고 다양한 분야에서 창작 활동을 하는 아웃오브블루의 삶과 가장 밀접한 글이자, " +
      "누구나 일상 속에서 공감할 수 있는 위트와 철학이 담긴 시적 에세이",
    thumbnail: thumbnail_outOfBlue,
    pages: outOfBluePreview,
    link: "https://smartstore.naver.com/theblueroom/products/8202198583",
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
  const [currentBook, setCurrentBook] = useState<BookData>(data[0]);
  const [reading, setReading] = useState<number | false>(false);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) setDisplayBubble(true);
  }, []);

  return (
    <main className={cx("main")}>
      <div className={cx("content")}>
        <div
          className={cx("coverButton")}
          onClick={() => {
            setDisplayBubble(true);
          }}
        />
        <div className={cx("bookWrapper")}>
          <Image
            src={currentBook.thumbnail}
            alt={`thumbnail of ${currentBook.title}`}
            fill
          />
        </div>
      </div>
      {displayBubble && (
        <div
          className={cx("bubbleWrapper")}
          onClick={() => {
            if (window.innerWidth >= 1024) setDisplayBubble(false);
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
                    alt={`Book cover of ${book.title}`}
                    quality={10}
                    fill
                  />
                  <div
                    className={cx("bookOverlay", {
                      on: currentBook?.id === book.id,
                    })}
                  >
                    <button
                      onClick={() => {
                        setCurrentBook(book);
                        setReading(0);
                      }}
                    >
                      책 읽어보기
                    </button>
                    <button
                      onClick={() => {
                        window.open(book.link);
                      }}
                    >
                      구매
                    </button>
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
                className={cx("pageWrapper", "mobileOnly")}
                onClick={(e) => e.stopPropagation()}
              >
                {reading * 2 < currentBook.pages.length && (
                  <Image
                    src={currentBook.pages[reading]}
                    alt={`${currentBook.title} page ${reading}`}
                    objectFit={"contain"}
                    fill
                  />
                )}
              </div>
              <div
                className={cx("pageWrapper", "pcOnly")}
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
