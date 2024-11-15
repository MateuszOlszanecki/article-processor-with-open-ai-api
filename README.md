# Aplikacja do konwersji artykułów na HTML

## Opis

Aplikacja pozwala na konwersję artykułów w formacie tekstowym (.txt) do strukturalnego dokumentu HTML. Proces konwersji obejmuje przekształcenie tekstu w odpowiednią hierarchię tagów HTML (np. `<h1>`, `<h2>`, `<p>`, `<ul>`, itp.), a także dodanie sugestii dotyczących miejsc, w których mogą zostać wstawione obrazy. Program korzysta z API OpenAI, aby przetworzyć artykuł na odpowiedni format HTML zgodnie z określonymi wytycznymi.

## Funkcjonalności

1. **Konwersja artykułu do HTML**: Aplikacja przekształca artykuł tekstowy w dobrze ustrukturalizowany dokument HTML.
2. **Sugestie dotyczące obrazów**: Na podstawie treści artykułu aplikacja sugeruje miejsca, w których obrazy mogą wzbogacić artykuł, a także dostarcza opis w formacie alt do generowania tych obrazów.
3. **Podpisy pod obrazami**: Dla każdego obrazu dodawany jest podpis w tagu `<figcaption>`, który opisuje zawartość obrazu.
4. **Brak CSS i JavaScript**: Wygenerowany HTML nie zawiera żadnych stylów CSS ani skryptów JavaScript.

## Wymagania

- Node.js (w wersji co najmniej 14.x)
- Klucz API OpenAI (wymagany do integracji z OpenAI GPT)

## Instrukcja uruchomienia

### Krok 1: Instalacja zależności

1. Sklonuj repozytorium:

    ```bash
    git clone https://github.com/MateuszOlszanecki/article-processor-with-open-ai-api.git
    cd article-processor-with-open-ai-api
    ```

2. Zainstaluj zależności:

    ```bash
    npm install
    ```

### Krok 2: Konfiguracja

1. Utwórz plik `environment.js` w katalogu głównym repozytorium.
2. W pliku `environment.js` umieść swój klucz API OpenAI:

    ```
    const OPENAI_API_KEY = "your-openai-api-key"
    export default OPENAI_API_KEY;
    ```

### Krok 3: Przygotowanie artykułu

- Umieść artykuł w formacie tekstowym (.txt) w katalogu głównym repozytorium. Plik powinien być zapisany jako `artykul_surowy.txt`.

### Krok 4: Uruchomienie aplikacji

Uruchom aplikację za pomocą poniższego polecenia:

```bash
node script.js
```

Jeśli program wykonał się bez błędu to plik z przetworzonym artykułem zostanie zapisany katalogu głównym repozytorium jako `artykul.html`.
