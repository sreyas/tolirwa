// Api Paths

const { gql } = require("@apollo/client");


//:::::::::::: Header:::::::::: //

const HEADER_MENUS =gql`
query  {
  menus {
    nodes {
      menuItems {
        nodes {
          uri
          url
          path
          parentId
          order
          id
          label
        }
      }
    }
  }
}
`
export { HEADER_MENUS };


//:::::::::: Home Page ::::::::::::: //

// :::::::: Slider Image & Data :::::::::: //

const SLIDER_DATA= gql`
  query {
  slides(first: 10) {
    nodes {
      id
      title
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
`;

export { SLIDER_DATA };


// ::::::: Home Page _Content ::::::: //

const HOME_PAGE_CONTENT = gql`
  query  {
    pageBy(uri: "home") {
      id
      title
      slug
      content
    }
  }`;
export { HOME_PAGE_CONTENT };



/////////////////////////////////======= About-Us =======//////////////////////////////////////

// :::::::: About Us Page _Content ::::::: //

const ABOUT_US_PAGE_CONTENT = gql`
    query  {
      pageBy(uri: "about-us") {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }`;
export { ABOUT_US_PAGE_CONTENT };


/////////////////////////////////======= Gallery =======//////////////////////////////////////

// :::::::: Gallery Page _Content ::::::: //

const GALLERY_PAGE_CONTENT = gql`
    query  {
      pageBy(pageId: 204, uri: "gallery") {
        content
        title
        slug
        uri
      }
    }`;
export { GALLERY_PAGE_CONTENT };


/////////////////////////////////======= Contact Us =======//////////////////////////////////////

// :::::::: Contact us _Content ::::::: //

const CONTACT_US_CONTENT = gql`
    query {
      pageBy(pageId: 30, uri: "contact-us") {
        content
        title
        slug
        uri
      }
    }`;
export { CONTACT_US_CONTENT };


/////////////////////////////////======= Sheet Content =======//////////////////////////////////////

// :::::::: Sheet _Content ::::::: //

const SHEETS_CONTENT = gql`
    query {
      pageBy(pageId: 709, uri: "sheets") {
        content
        title
        slug
        uri
      }
    }`;
export { SHEETS_CONTENT };


// :::::::: Sheet _Content By id ::::::: //

export const SHEETS_CONTENT_ID = gql`
  query GetSheetPage($slug: String!) {
    postBy(slug: $slug) {
      content
      title
      slug
      featuredImage {
        node {
          sourceUrl
          title
          slug
        }
      }
    }
  }
`;


/////////////////////////////////======= galvanised-sheets =======//////////////////////////////////////

// :::::::: galvanised-sheets ::::::: //

export const GALVANISED_SHEETS_CONTENT= gql`
    query {
      pageBy(pageId: 712, uri: "galvanised-sheets") {
        content
        title
        slug
        uri
      }
    }`;


// :::::::: Sheet _Content By id ::::::: //

export const GALVANISED_SHEETS_CONTENT_BY_ID= gql`
  query GetSheetPage($slug: String!) {
    postBy(slug: $slug) {
      content
      title
      slug
      featuredImage {
        node {
          sourceUrl
          title
          slug
        }
      }
    }
  }
`;


/////////////////////////////////======= MILD_STEEL =======//////////////////////////////////////

// :::::::: MILD_STEEL-sheets ::::::: //

export const MILD_STEEL_SHEETS_CONTENT= gql`
    query {
      pageBy(pageId: 719, uri: "mild-steel") {
        content
        title
        slug
        uri
      }
    }`;


// :::::::: MILD_STEEL By id ::::::: //

export const MILD_STEEL_SHEETS_CONTENT_BY_ID= gql`
  query GetSheetPage($slug: String!) {
    postBy(slug: $slug) {
      content
      title
      slug
      featuredImage {
        node {
          sourceUrl
          title
          slug
        }
      }
    }
  }
`;


/////////////////////////////////======= Miscellaneous =======//////////////////////////////////////

// :::::::: Miscellaneous-sheets ::::::: //

export const MISCELLANEOUS_SHEETS_CONTENT= gql`
    query {
      pageBy(pageId: 722, uri: "miscellaneous") {
        content
        title
        slug
        uri
      }
    }`;


// :::::::: Miscellaneous By id ::::::: //

export const MISCELLANEOUS_SHEETS_CONTENT_BY_ID= gql`
  query GetSheetPage($slug: String!) {
    postBy(slug: $slug) {
      content
      title
      slug
      featuredImage {
        node {
          sourceUrl
          title
          slug
        }
      }
    }
  }
`;




/////////////////////////////////======= Product Page =======//////////////////////////////////////

// :::::::: Product Page Data ::::::: //

export const PRODUCT_PAGE_CONTENT= gql`
    query {
      pageBy(pageId: 207) {
        content
        title
        slug
        uri
      }
    }`;



    // :::::::::::::: Fetch All products ::::::::::::: //

    export const FETCH_ALL_PRODUCT_DETAILS=gql`
      
      query {
        pages(where: {nameIn: ["miscellaneous", "mild-steel", "sheets","galvanised-sheets"]}) {
          nodes {
            id
            title
            slug
            content
          }
        }
      }`;


      // ::::::::::::  Banner Slider Images :::::::::::: //


export const FETCH_SLIDER_IMAGES=gql`
query  {
  slides(first: 10, where: {}) {
    edges {
      node {
        id
        slug
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
      }
    }
  }
}
`


export const FETCH_GET_QUOTES=gql`
query {
  pages(where: {nameIn: "get-a-quote"}) {
    nodes {
      content
      slug
      title(format: RENDERED)
    }
  }
}
`








