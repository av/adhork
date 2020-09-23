import { AdStats } from "lib/ads";
import { HTMLAttributes } from "react";

export type AdItemProps = {
  item: AdStats;
} & HTMLAttributes<HTMLDivElement>;

export default function AdItem({ item, ...rest }: AdItemProps) {
  return (
    <div {...rest}>
      <h3>{item.ad.title}</h3>
      <small>{item.ad.id}</small>
      <h4>Clicks: {item.stats.clicks}</h4>
      <h4>Loads: {item.stats.loads}</h4>
      <style jsx>{`
        h3 {
          margin: 0;
        }

        h4 {
          margin: .5rem 0;
        }

        small {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
