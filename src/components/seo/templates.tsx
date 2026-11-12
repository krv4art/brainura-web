// Шаблоны SEO-страниц (SEO_PLAN §2, шаг 0.6 и §5): ToolPage, GamePage, ArticlePage,
// ComparePage. Общее: хлебные крошки, H1, подводка, тело, FAQ, источники, связанные
// страницы, блок «скачать» с UTM, JSON-LD по типу страницы.
//
// Правила страницы (§5): один главный кластер; H1 = главный ключ в естественной форме;
// инструмент/суть — над сгибом; FAQ из «People also ask»; источники для любой науки.

import type { ReactNode } from "react";
import type { Crumb } from "@/lib/schema";
import { LOCALES, type Locale } from "@/lib/i18n";
import { UI } from "@/lib/ui";
import { Takeaways, Toc, countWords, type BlockSection } from "./blocks";
import { breadcrumbLd, faqLd, webAppLd, mobileAppLd, articleLd } from "@/lib/schema";
import {
  Breadcrumbs,
  DownloadBlock,
  FaqList,
  JsonLd,
  MoreGamesPromo,
  Related,
  Sources,
  proseClass,
  type FaqItem,
  type RelatedLink,
  type Source,
} from "./parts";

interface BaseProps {
  path: string;
  crumbs: Crumb[];
  h1: string;
  lead: ReactNode;
  /** Описание для JSON-LD (обычно = meta description). */
  description: string;
  children: ReactNode;
  faq?: FaqItem[];
  sources?: Source[];
  related?: RelatedLink[];
  download: { title: string; body: string };
  /** utm_campaign для кнопки Play. */
  campaign: string;
  /** Язык страницы (по умолчанию английский). */
  lang?: Locale;
}

function Shell({
  crumbs,
  h1,
  lead,
  top,
  children,
  faq = [],
  sources = [],
  related = [],
  download,
  campaign,
  ld,
  meta,
  intro,
  lang = "en",
  promo = false,
}: BaseProps & { top?: ReactNode; ld: object[]; meta?: ReactNode; intro?: ReactNode; promo?: boolean }) {
  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
      <JsonLd data={[breadcrumbLd(crumbs, lang), ...ld, ...(faq.length ? [faqLd(faq)] : [])]} />
      <Breadcrumbs crumbs={crumbs} />
      <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl">
        {h1}
      </h1>
      {meta}
      <div className="mt-4 text-lg leading-relaxed text-[var(--color-text-secondary)]">{lead}</div>
      {intro}
      {top && <div className="mt-8">{top}</div>}
      {promo && <MoreGamesPromo campaign={campaign} lang={lang} />}
      <div className={`mt-4 ${proseClass}`}>{children}</div>
      <FaqList faq={faq} lang={lang} />
      <Related links={related} lang={lang} />
      <DownloadBlock campaign={campaign} title={download.title} body={download.body} lang={lang} />
      <Sources sources={sources} lang={lang} />
    </article>
  );
}

/** Инструмент: тест в браузере над сгибом, текст под ним. */
export function ToolPage(props: BaseProps & { tool: ReactNode; toolName: string }) {
  return (
    <Shell
      {...props}
      top={props.tool}
      promo
      ld={[webAppLd(props.toolName, props.description, props.path, props.lang)]}
    />
  );
}

/** Страница игры приложения: что тренирует, как играть, скачать. */
export function GamePage(props: BaseProps & { hero?: ReactNode }) {
  return <Shell {...props} top={props.hero} promo ld={[mobileAppLd()]} />;
}

/**
 * Статья под info-кластер. Дата и время чтения видны; «коротко о главном» и
 * оглавление — над текстом, если переданы `takeaways` и `sections`.
 */
export function ArticlePage(
  props: BaseProps & { published: string; modified?: string; takeaways?: string[]; sections?: BlockSection[] },
) {
  const lang = props.lang ?? "en";
  const t = UI[lang].article;
  const shown = props.modified ?? props.published;
  const minutes = props.sections ? Math.max(1, Math.round(countWords(props.sections) / 220)) : null;
  return (
    <Shell
      {...props}
      meta={
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          {t.team} · {props.modified ? `${t.updated} ` : ""}
          <time dateTime={shown}>{new Date(shown).toLocaleDateString(LOCALES[lang].dateLocale, { year: "numeric", month: "long", day: "numeric" })}</time>
          {minutes && <> · {t.minRead(minutes)}</>}
        </p>
      }
      intro={
        <>
          {props.takeaways?.length ? <Takeaways title={t.takeaways} items={props.takeaways} /> : null}
          {props.sections && props.sections.length > 2 ? <Toc title={t.toc} sections={props.sections} /> : null}
        </>
      }
      ld={[
        articleLd({
          headline: props.h1,
          description: props.description,
          path: props.path,
          published: props.published,
          modified: props.modified,
          lang,
        }),
      ]}
    />
  );
}

/** Сравнение/подборка: без логотипов и чужих знаков в заголовке страницы. */
export function ComparePage(props: BaseProps & { published: string; modified?: string }) {
  return <ArticlePage {...props} />;
}
