import {Routes, Route} from 'react-router-dom';
import {
    AboutUsPage,
    AdminPage,
    AllShelvesPage,
    BookPage,
    BookShelfPage,
    BooksPage,
    BorrowedBookPage,
    ContactUsPage,
    CreateBookPage,
    CreateShelfPage,
    DonateBookPage,
    FaqPage,
    HomePage,
    HowItWorksPage,
    NotFoundPage,
    RegistrationPage,
    TermsAndConditionsPage,
    TermsConditionPage,
    UserPage,
    UserProfilePage,
    UserUpdatePage,
} from './Pages';


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

         <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/profile-update" element={<UserUpdatePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />

        <Route path="/bookshelves/:bookshelfId">
          <Route index element={<BookShelfPage />} />
          <Route path="books">
            <Route index element={<BooksPage />} />
            <Route path=":bookId" element={<BookPage />} />
          </Route>
        </Route>

        <Route path="/create-shelf" element={<CreateShelfPage />} />
        <Route path="/all-shelves" element={<AllShelvesPage />} />
        <Route path="/donate-book" element={<DonateBookPage />} />
        <Route path="/borrowed-book" element={<BorrowedBookPage />} />

        <Route path="/create-book/:id" element={<CreateBookPage />} />

        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/terms-condition" element={<TermsConditionPage />} />


        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  )
}

export default App
