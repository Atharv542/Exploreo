import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate travel plan for location: Las Vegas,for 3 days for couple with a cheap budget, give me a hotels options list with HotelName,Hotel address, Price,Hotel image url, Geo Coordinates,rating  and suggest itinerary with placeName,Place details,Place image url,Geo coordinates,ticket pricing,rating,time to  travel each of the location  for 3 days with each day plan with best time to visit in JSON format "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, here's a JSON formatted travel plan for a budget-conscious couple visiting Las Vegas for 3 days. This plan focuses on free or low-cost activities, and hotel options are selected for value.\n\n```json\n{\n  \"travelPlan\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\",\n    \"travelers\": \"Couple\",\n    \"hotelOptions\": [\n      {\n        \"hotelName\": \"Circus Circus Hotel\",\n        \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n        \"price\": \"Approx. $40 - $70 per night\",\n          \"hotelImageUrl\": \"https://www.circuscircus.com/wp-content/uploads/2022/09/circus-circus-hotel-and-casino.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1259,\n          \"longitude\": -115.1678\n        },\n        \"ratingDescription\": \"A classic Vegas hotel with a focus on family fun. Offers a good value with basic rooms, and the Adventuredome theme park.\"\n      },\n        {\n        \"hotelName\": \"Excalibur Hotel & Casino\",\n        \"hotelAddress\": \"3850 S Las Vegas Blvd, Las Vegas, NV 89109\",\n        \"price\": \"Approx. $50 - $80 per night\",\n          \"hotelImageUrl\":\"https://www.parkmgm.com/content/dam/the-m-life/parkmgm/property-images/exterior/parkmgm-aerial-front-night-780x440.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0983,\n          \"longitude\": -115.1732\n        },\n          \"ratingDescription\":\"Medieval-themed hotel with a lively atmosphere and affordable rooms. Good for couples who want a themed experience on a budget.\"\n      },\n      {\n         \"hotelName\": \"OYO Hotel & Casino Las Vegas\",\n          \"hotelAddress\": \"115 E Tropicana Ave, Las Vegas, NV 89109\",\n          \"price\":\"Approx. $35 - $65 per night\",\n           \"hotelImageUrl\":\"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/02/b6/58/oyo-hotel-casino-las-vegas.jpg?w=1200&h=-1&s=1\",\n          \"geoCoordinates\": {\n            \"latitude\": 36.1020,\n            \"longitude\": -115.1684\n          },\n          \"ratingDescription\": \"Budget-friendly hotel close to the Strip, offering basic accommodations at a lower price. Good for those focused on sightseeing and less on lavish hotel amenities.\"\n        }\n    ],\n    \"itinerary\": {\n      \"day1\": {\n        \"theme\": \"Exploring the Strip\",\n         \"bestTimeToVisit\":\"Morning and evening to avoid midday heat\",\n        \"activities\": [\n          {\n            \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n            \"placeDetails\": \"A beautiful indoor garden display that changes seasonally. Free to enter.\",\n            \"placeImageUrl\": \"https://www.bellagio.com/content/dam/mgm/bellagio/property/conservatory-botanical-garden/bellagio-conservatory-garden-main-01.jpg.imgo.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1125,\n              \"longitude\": -115.1742\n            },\n              \"ticketPricing\": \"Free\",\n              \"rating\":\"4.8/5\",\n            \"timeToTravel\": \"Hotel to Bellagio: 10-20 minutes (Depending on hotel location and whether walking or using the Deuce Bus)\"\n          },\n          {\n            \"placeName\": \"Fountains of Bellagio\",\n            \"placeDetails\": \"A spectacular water show with music and lights. Runs every 30 minutes in the afternoon and every 15 minutes in the evening. Free to watch.\",\n             \"placeImageUrl\":\"https://www.bellagio.com/content/dam/mgm/bellagio/property/amenities/bellagio-fountains/b-fountain-wide-003.jpg.imgo.jpg\",\n             \"geoCoordinates\": {\n               \"latitude\": 36.1126,\n               \"longitude\": -115.1737\n              },\n            \"ticketPricing\": \"Free\",\n            \"rating\":\"4.9/5\",\n              \"timeToTravel\": \"Located outside the Bellagio, immediately after the garden\"\n          },\n           {\n              \"placeName\": \"The LINQ Promenade\",\n              \"placeDetails\":\"An outdoor shopping, dining, and entertainment district. Features the High Roller observation wheel (optional paid attraction). Free to stroll through.\",\n             \"placeImageUrl\": \"https://caesars.brightspotcdn.com/dims4/default/3b7a894/2147483647/strip/true/crop/2048x1024+0+0/resize/1200x600!/quality/90/?url=https%3A%2F%2Fcaesars.brightspotcdn.com%2Ff2%2F03%2F910a117d4830a4c583773969c5d7%2Flinq-promenade-01.jpg\",\n            \"geoCoordinates\":{\n                  \"latitude\":36.1165,\n                  \"longitude\":-115.1699\n             },\n             \"ticketPricing\":\"Free\",\n              \"rating\":\"4.6/5\",\n              \"timeToTravel\":\"5-10 mins walk from the Fountains of Bellagio\"\n           },\n           {\n              \"placeName\":\"Mirage Volcano\",\n              \"placeDetails\":\"Watch a volcano erupt with fire and water. Free show in front of the Mirage hotel.\",\n              \"placeImageUrl\":\"https://a.cdn-hotels.com/gdcs/production117/d1226/1218d91f-8f1e-45c2-b566-c83f9d9a526a.jpg\",\n             \"geoCoordinates\":{\n                  \"latitude\": 36.1215,\n                  \"longitude\": -115.1701\n              },\n             \"ticketPricing\":\"Free\",\n             \"rating\":\"4.7/5\",\n             \"timeToTravel\":\"5-10 mins walk from the LINQ Promenade\"\n           }\n        ]\n      },\n      \"day2\": {\n        \"theme\": \"Downtown and Fremont Experience\",\n          \"bestTimeToVisit\":\"Evening for the light show\",\n        \"activities\": [\n          {\n            \"placeName\": \"Fremont Street Experience\",\n            \"placeDetails\": \"A pedestrian mall with a massive LED canopy screen showing light shows. Free to walk around and watch shows.\",\n            \"placeImageUrl\": \"https://a.cdn-hotels.com/gdcs/production167/d1838/3bc46d47-8f9e-45ca-89e8-38ff715d29c7.jpg?impolicy=fcrop&w=800&h=533&q=medium\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.1705,\n              \"longitude\": -115.1400\n            },\n            \"ticketPricing\": \"Free\",\n            \"rating\":\"4.7/5\",\n            \"timeToTravel\": \"Hotel to Fremont: 20-30 mins by car or ride-share, or use the Deuce bus (takes longer, but more budget-friendly)\"\n          },\n          {\n             \"placeName\":\"Container Park\",\n             \"placeDetails\":\"Shopping area with stores and restaurants built from shipping containers, with interactive playground and live music options.\",\n            \"placeImageUrl\":\"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Downtown_Container_Park_Las_Vegas_%2824425243972%29.jpg/1200px-Downtown_Container_Park_Las_Vegas_%2824425243972%29.jpg\",\n            \"geoCoordinates\":{\n                  \"latitude\":36.1672,\n                 \"longitude\":-115.1378\n              },\n             \"ticketPricing\":\"Free (some activities and attractions may have fees)\",\n             \"rating\":\"4.6/5\",\n              \"timeToTravel\": \"5-10 minutes walk from Fremont Street Experience\"\n           },\n           {\n             \"placeName\": \"Golden Nugget Casino\",\n             \"placeDetails\":\"A historic casino with a shark tank pool and a vintage Vegas feel. Free to enter and walk around. Shark Tank viewing is free.\",\n              \"placeImageUrl\": \"https://cdn.vegas.com/img/hotel/102/golden-nugget-pool.jpg\",\n             \"geoCoordinates\":{\n                  \"latitude\": 36.1687,\n                  \"longitude\": -115.1434\n             },\n              \"ticketPricing\":\"Free\",\n             \"rating\":\"4.5/5\",\n              \"timeToTravel\":\"5-10 minutes walk from Container Park\"\n           },\n           {\n              \"placeName\": \"Mob Museum\",\n              \"placeDetails\":\"If you are a big fan of Mob you can add this to your iternary, an informative museum about organized crime in USA.\",\n              \"placeImageUrl\":\"https://www.mobmuseum.org/wp-content/uploads/2020/03/Mob-Museum-Exterior.jpg\",\n             \"geoCoordinates\":{\n                  \"latitude\":36.1694,\n                  \"longitude\":-115.1474\n              },\n              \"ticketPricing\":\"Around $30 per person\",\n             \"rating\":\"4.7/5\",\n             \"timeToTravel\":\"5-10 minutes walk from Golden Nugget Casino\"\n           }\n        ]\n      },\n      \"day3\": {\n        \"theme\": \"South Strip and Relaxation\",\n           \"bestTimeToVisit\":\"Morning or afternoon for outdoor exploring\",\n        \"activities\": [\n          {\n            \"placeName\": \"Welcome to Fabulous Las Vegas Sign\",\n            \"placeDetails\": \"A classic photo opportunity at the famous sign.\",\n            \"placeImageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Welcome_to_Fabulous_Las_Vegas_Sign.jpg/1200px-Welcome_to_Fabulous_Las_Vegas_Sign.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.0828,\n              \"longitude\": -115.1725\n            },\n            \"ticketPricing\": \"Free\",\n            \"rating\":\"4.6/5\",\n             \"timeToTravel\": \"Hotel to Welcome Sign: 10-20 minutes depending on your hotel location\"\n          },\n          {\n            \"placeName\": \"Mandalay Bay Beach\",\n            \"placeDetails\": \"A large beach area with a wave pool and lazy river.  Free to enter (may have fees for tube rentals and cabanas).\",\n              \"placeImageUrl\":\"https://www.mandalaybay.com/content/dam/mandalaybay/property/pool/mandalay-bay-pool-overview-620.jpg.imgo.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 36.0910,\n              \"longitude\": -115.1746\n            },\n            \"ticketPricing\": \"Free entrance (amenities may cost extra)\",\n              \"rating\":\"4.5/5\",\n             \"timeToTravel\":\"10-15 minutes from the welcome sign by cab or ride share\"\n          },\n         {\n              \"placeName\":\"Luxor Hotel Pyramid\",\n              \"placeDetails\": \"Check out the iconic Pyramid and take pictures of the inside.\",\n              \"placeImageUrl\":\"https://a.cdn-hotels.com/gdcs/production167/d1838/e3a17e32-8315-438a-b122-047972b9e614.jpg\",\n              \"geoCoordinates\":{\n                   \"latitude\":36.0954,\n                   \"longitude\":-115.1740\n               },\n              \"ticketPricing\":\"Free to enter (attractions may cost extra)\",\n              \"rating\":\"4.4/5\",\n              \"timeToTravel\":\"5-10 minutes walk from Mandalay Bay Beach\"\n         },\n         {\n            \"placeName\": \"Walk around the South Strip\",\n            \"placeDetails\":\"Walk around the south strip to explore other hotels like Paris, Newyork Newyork , MGM Grand etc.  Free to walk around and window shop.\",\n            \"placeImageUrl\": \"https://a.cdn-hotels.com/gdcs/production167/d1838/17089a82-46b5-4c92-a3d0-d86741322765.jpg\",\n             \"geoCoordinates\": {\n               \"latitude\": 36.1028,\n               \"longitude\": -115.1717\n              },\n             \"ticketPricing\":\"Free\",\n              \"rating\":\"4.5/5\",\n             \"timeToTravel\":\"Depending on which end of the south strip you start from, walking time can be varied.\"\n          }\n        ]\n      }\n    }\n  }\n}\n```\n**Notes:**\n\n*   **Prices:** Hotel prices are estimates and can vary based on time of year, day of the week, and how far in advance you book.\n*   **Transportation:**  Consider using the Deuce bus for budget-friendly transport along the Strip. Walking is also a great option for many of these attractions. Ridesharing (Uber, Lyft) is convenient but more expensive.\n*   **Food:** To save money, consider eating at less expensive eateries, sharing meals, and taking advantage of happy hour deals. Also, grocery stores can be used for breakfast or snacks.\n*   **Flexibility:** This itinerary is a suggestion. Feel free to customize it based on your interests and pace.\n*   **Free Activities:** Many things in Las Vegas are free (or very cheap), such as walking the Strip, people-watching, and enjoying the various shows and displays.\n\nThis plan will give you a fun, memorable experience in Las Vegas without breaking the bank!\n"},
          ],
        },
      ],
    });
  
   