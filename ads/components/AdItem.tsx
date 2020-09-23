import { AdStats } from "lib/ads";
import { HTMLAttributes } from "react";

export type AdItemProps = {
  item: AdStats;
} & HTMLAttributes<HTMLDivElement>;

export default function AdItem({ item, ...rest }: AdItemProps) {
  return (
    <div {...rest} data-e2e-ad-item>
      <h3 e2e-ad-title>{item.ad.title}</h3>
      <small>{item.ad.id}</small>
      <h4>
        <span>Clicks: </span>
        <span data-e2e-ad-clicks>{item.stats.clicks}</span>
      </h4>
      <h4>Loads: {item.stats.loads}</h4>
      <style jsx>{`
        h3 {
          margin: 0;
        }

        h4 {
          margin: 0.5rem 0;
        }

        small {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
