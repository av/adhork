import { Selector } from "testcafe";
import config from "../lib/config";

fixture`Clicking an Ad`.page(config.adsUrl);

test("Clicking an Ad should increase recorded clicks count", async (t) => {
  const getClicks = async () =>
    parseInt(
      await Selector(`[data-e2e-ad-item] [data-e2e-ad-clicks]`).innerText
    );

  const adClicks = await getClicks();

  await t.navigateTo(config.newsUrl);

  const href = (await Selector("[data-e2e-ad-item] > a").attributes).href;

  await t.openWindow(href).closeWindow();
  await t.navigateTo(config.adsUrl);
  await t.expect(await getClicks()).eql(adClicks + 1);
});
