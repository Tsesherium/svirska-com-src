import path from 'path'
import axios from 'axios'
import fs from "fs"
import klaw from "klaw";
import sharp from "sharp";

import Dimensions from './src/dimensions'

const picturesSorucePath = "./src/pictures";

const normalizeCatName = (catname) => {

  const prefix = "svirska-";
  let cat = {
    id: prefix + "uncategorized",
    name : "Uncategorized" 
  };

  if(catname){
    cat.id = prefix + catname.toLowerCase().replace(/[^a-z]/g, "_");
    cat.name = catname;
  }

  return cat;
}

const getImageDescription = (filePath) => {
  if (!fs.existsSync(filePath)){
    return {
      category: normalizeCatName(null),
      description : "",
      title : path.basename(filePath),
      tags: []
    };
  }

  const data = fs.readFileSync(filePath, "utf8");
  try{
  let parsed = JSON.parse(data);

  parsed.category = normalizeCatName(parsed.category);

  return parsed;
}
catch(e){
  console.log(`failed parsing ${filePath}: ${e}`);
  return {
    category: normalizeCatName(null),
    description : "",
    title : path.basename(filePath),
    tags: []
  };
}

}

function getAllCategories(){

  let categories = new Map();

  return new Promise(resolve=>{
    
    if (!fs.existsSync(picturesSorucePath)) {
      resolve(categories.values());
      return;
    }

    klaw(picturesSorucePath)
    .on("data", item => {

      if (path.extname(item.path) !== ".js" ||
        path.dirname(item.path).endsWith("thumb"))
        return;

      const descriptor = getImageDescription(item.path);

      categories.set(descriptor.category.id,descriptor.category);
    })
    .on("error", e => {
        console.log(e);
      })
    .on("end", () => {
      // Resolve promise for async getRoutes request //
      resolve(categories.values());
    });
  })
}

function getArtWorks() {
  const items = [];

  // Walk ("klaw") through posts directory and push file paths into items array //
  const getFiles = () =>
    new Promise(resolve => {

      let id = 0;

      if (!fs.existsSync(picturesSorucePath)) {
        resolve(items);
        return;
      }

      klaw(picturesSorucePath)
        .on("data", item => {

          if (path.extname(item.path) !== ".jpg" ||
            path.dirname(item.path).endsWith("thumb"))
            return;

          let minifiedPath = picturesSorucePath + '/thumb/th-' + path.basename(item.path);

          sharp(item.path)
            .trim(30)
            .resize(
              Dimensions.thumbWidth + Dimensions.thumbCrop * 2,
              Dimensions.thumbHeight + Dimensions.thumbCrop * 2)
            .extract({ 
              left: Dimensions.thumbCrop, 
              top: Dimensions.thumbCrop, 
              width: Dimensions.thumbWidth, 
              height: Dimensions.thumbHeight})
            .sharpen(0.5)
            .toFile(minifiedPath);

          const descriptor = getImageDescription(item.path.substr(0, item.path.lastIndexOf(".")) + ".js");

          items.push({
            title: descriptor.title,
            id: ++id,
            category: descriptor.category.id,
            categoryName: descriptor.category.name,
            thumbKey: path.basename(minifiedPath),
            imageKey: path.basename(item.path),
            description: descriptor
          });

        })
        .on("error", e => {
          console.log(e);
        })
        .on("end", () => {
          // Resolve promise for async getRoutes request //
          resolve(items);
        });

    });
  return getFiles();
}

export default {
  getSiteData: async () => {
    const catmap = await getAllCategories();


    return {categories: Array.from(catmap)};
  },
  getRoutes: async () => {
    const art = await getArtWorks();

    const grouped = art.reduce((g, item) => {
      (g[item.category] = g[item.category] || []).push(item);
      return g;
    }, []);

    let routes = [];

    for (const [name, group] of Object.entries(grouped)) {

      routes.push({
        path: '/' + name,
        template: 'src/pages/art',
        getData: () => ({
          categoryName : group[0].categoryName,
          works: group
        }),
        children: group.map(artItem => ({
          path: `work/${artItem.id}`,
          template: 'src/containers/artwork',
          getData: () => ({
            work: artItem,
          }),
        }))
      });
    }

    //Default path

    routes.push({
      path: '/',
      template: 'src/pages/art',
      getData: () => ({
        works: art
      })
    });

    return routes;

  },
  plugins: [
    "react-static-plugin-styled-components",
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap')
  ],
}
