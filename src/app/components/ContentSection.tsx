import { Link } from "react-router";

interface ContentLink {
  label: string;
  href: string;
}

interface ContentSectionProps {
  eyebrow: string;
  heading: string;
  paragraph: string;
  links: ContentLink[];
  imageSrc: string;
  imageAlt: string;
  /** If true, image is on the left. Default: image on right */
  imageLeft?: boolean;
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0"
    >
      <path
        d="M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContentSection({
  eyebrow,
  heading,
  paragraph,
  links,
  imageSrc,
  imageAlt,
  imageLeft = false,
}: ContentSectionProps) {
  const textContent = (
    <div className="flex flex-col justify-center">
      <p className="text-[11px] tracking-[0.2em] uppercase mb-4 text-primary">
        {eyebrow}
      </p>
      <h2 className="mb-5">{heading}</h2>
      <p className="text-[17px] leading-[1.7] text-foreground/60 mb-8 max-w-lg whitespace-pre-line">
        {paragraph}
      </p>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="group inline-flex items-center gap-2.5 text-[15px] text-secondary hover:opacity-80 transition-opacity"
          >
            <span>{link.label}</span>
            <span className="transition-transform group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );

  const imageContent = (
    <div className="w-full">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-auto rounded-lg object-cover"
        loading="lazy"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imageLeft ? (
        <>
          <div className="order-1">{imageContent}</div>
          <div className="order-2">{textContent}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{textContent}</div>
          <div className="order-1 lg:order-2">{imageContent}</div>
        </>
      )}
    </div>
  );
}