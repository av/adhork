import { HTMLAttributes } from "react";
import { NewsItem } from "lib/hackernews";

export type NewsCardProps = {
  item: NewsItem;
} & HTMLAttributes<HTMLDivElement>;

export default function NewsCard({ item, ...rest }: NewsCardProps) {
  return (
    <div {...rest}>
      {!item.url && <h3>{item.title}</h3>}
      {item.url && (
        <a href={item.url} target="_blank">
          <h3>{item.title} &rarr;</h3>
        </a>
      )}
      {item.text && <p dangerouslySetInnerHTML={{ __html: item.text }}></p>}
      <style jsx>{`
        div > p {
          --max-lines: 5;
          position: relative;
          max-height: calc(.9em * var(--max-lines));
          overflow: hidden;
          padding-right: 1em;
        }

        div > p::before { 
          position: absolute;
          bottom: 0;
          right: 0;
          width: 70%;
          background: linear-gradient(to right, white, transparent);
        }
      `}</style>
    </div>
  );
}
