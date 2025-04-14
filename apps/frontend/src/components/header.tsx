import koreaEmblem from '../assets/korea-emblem.svg';

export default function Header() {
  return (
    <header className="bg-background fixed top-0 z-10 w-full overflow-hidden border-b-2">
      <nav className="flex h-16 items-center justify-center px-4 lg:m-auto lg:max-w-5xl lg:justify-between lg:p-0">
        <a aria-current="page" href="/" className="flex items-center">
          <img
            src={koreaEmblem}
            alt="Emblem of the National Government of Korea"
            className="mr-1 size-8 md:size-10"
          />
          <h1 className="text-korea-blue text-3xl font-bold md:text-4xl">
            hikorea
          </h1>
        </a>
      </nav>
    </header>
  );
}
