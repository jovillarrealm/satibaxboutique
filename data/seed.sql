-- Satibax Boutique Catalog Seed Data
-- Populates categories (4), products (74), and blog_posts (1)

-- 1. Categories
INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES ('5830755b-43b1-4ef9-93aa-aa337a263bfd', 'Natural', 'natural', 'Cosmética y cuidado natural');
INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES ('3f4af2e7-1348-4d62-99f0-4f1bc17152c2', 'Vegano', 'vegano', 'Productos 100% veganos y cruelty-free');
INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES ('a789a2b5-95e2-4d4b-80f8-c68e620cbb5a', 'Jabones', 'jabones', 'Jabones artesanales y naturales');
INSERT OR REPLACE INTO categories (id, name, slug, description) VALUES ('61f5cfdd-8cdd-4c34-88db-060efef554a7', 'skincare', 'skincare', 'Cuidado facial y tratamientos para la piel');

-- 2. Products
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('a60964b4-a6a0-446a-b3d7-3c1f82b34380', 'Serum Facial Retinol Night Repair', 'serum-facial-retinol-night-repair', '¿Qué hace? 

Este serum combina retinol y ácido hialurónico para combatir los signos visibles del envejecimiento. Su fórmula avanzada promueve la renovación celular, mejora la textura de la piel y suaviza líneas de expresión. También contribuye a reducir la hiperpigmentación y restaura la firmeza, dejando una piel uniforme y rejuvenecida. 

El ácido hialurónico complementa su acción al proporcionar hidratación profunda y mejorar la elasticidad, convirtiéndolo en un paso esencial en la rutina nocturna. 

Fórmula aprobada dermatológicamente 

Modo de uso: 
• Aplica una pequeña cantidad sobre la piel limpia y seca por la noche. 
• Masajea suavemente hasta su completa absorción, evitando el área de los ojos. 
• Si tienes piel muy sensible, puedes mezclar el serum con una crema hidratante para suavizar su efecto. 

Beneficios: 
• Promueve la renovación celular gracias al retinol. 
• Reduce líneas finas y mejora la firmeza de la piel. 
• Mejora la textura y unifica el tono. 
• Combate la hiperpigmentación, dejando una piel más uniforme. 
• Hidrata profundamente y rejuvenece, gracias al ácido hialurónico. 

**Usar solo de noche. Al día siguiente, aplicar protector solar

 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free 
Libre de Parabenos - Sin Alcohol  

_________________________ 
 

INGREDIENTES: WATER, CAPRYLIC/CAPRIC TRIGLY-CERIDE, GLYCERIN, ISOPROPYL MYRISTATE, CETEARETH-20, TOCOPHERYL ACETATE, CETEARYL ALCOHOL (AND) CETEARYL GLUCOSIDE, PHENOXYE-THANOL (AND) ETHYLHEXYLGLYCERIN, POLYSORBATE 80, TRIETHANOLAMINE, RETINOL (AND) POLYSORBATE 20 (AND) BHA (AND) BHT, CARBOMER, BENZOPHENONE- 3, ALCOHOL (AND) PROPYLENE GLYCOL (AND) SODIUM HYALUNORATE (AND) PHOSPHOLIPIDS (AND) XANTHAN GUM (AND) SODIUM BENZOATE (AND) POTASSIUM SORBATE (AND) CITRIC ACID, DISODIUM EDTA. ', 'Laima', 35000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821323772-281im.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821323772-281im.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821329503-es45x.webp"]', '[]', 0, 0, 1, '2026-01-19T14:40:03.696661-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('5c8380d8-4cab-4c0d-82c4-86113d4a0b3e', 'Desodorante odorono Piedra Alumbre', 'desodorante-odorono-piedra-alumbre', 'Piedra de Alumbre
Desodorante 100% Natural pulido de 120gr 

Elaborado a partir de Alumbre de Potasio. Neutraliza las bacterias responsables del mal olor. Posee acción antiséptica y astringente. No tiene fragancia y es apto para todo tipo de piel.

Indicado para:
- Axilas
- Pies
- Picaduras de insectos
- Post afeitado


Usos: Simplemente humedecé la piedra con agua y aplicala sobre la piel limpia. Protección natural y segura durante todo el día.

Beneficios:
- Seca rápidamente
- No mancha la ropa
- Dura más que los desodorantes comunes
- No obstruye los poros

Fórmula:
- Sin Clorhidrato de Aluminio
- Sin Parabenos
- Sin Alcohol
- Vegano', 'Satibax', 20000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780499830144-7odnq.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780499830144-7odnq.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780499830632-9ldf0.webp"]', '["natural","celiacosafe","vegano"]', 0, 0, 1, '2026-06-03T10:18:46.581448-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('c8871de9-4bc0-4978-a686-7ebe084a424a', 'Piedra de alumbre sin pulir', 'piedra-de-alumbre-sin-pulir', NULL, 'Satibax', 17497, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780840905760-39eeg.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780840905760-39eeg.webp"]', '["natural","vegano","celiacosafe"]', 0, 0, 1, '2026-06-07T09:02:16.956591-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7edbc2d3-5463-43ae-8b9f-c4264cb53007', 'Dúo Bálsamos Labiales con Color Cherry y Cherry Black – Hidratación y Estilo Único', 'duo-balsamos-labiales-con-color-cherry-y-cherry-black-hidratacion-y-estilo-unico', 'Descubrí el dúo irresistible de bálsamos labiales con Color Cherry y Cherry Black, diseñados para brindar una hidratación sublime y un color vibrante que dura todo el día. Estos bálsamos premium están formulados con ingredientes naturales y veganos que nutren profundamente tus labios, dejándolos suaves, protegidos y con un brillo radiante.

El tono Cherry aporta un color fresco y dulce, mientras que Cherry Black ofrece un acabado elegante y sofisticado con un toque ciruela intenso. Perfectos para usar juntos o por separado, estos bálsamos combinan estilo y cuidado en un solo pack.

Sin parabenos ni crueldad animal, este dúo es ideal para pieles sensibles y para quienes buscan un cuidado labial consciente y efectivo. Elevá tu rutina de belleza con este dúo de bálsamos que protege, hidrata y embellece.', 'PURASOAP', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841597715-nrzoa.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841597715-nrzoa.webp"]', '["natural","vegano"]', 0, 0, 1, '2026-06-07T09:13:49.565889-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('e4c7a9dc-9279-4b71-97ab-12cb6444b2c6', 'Protector Solar Facial fps 60 Color Light Pura Soap 30 ml', 'protector-solar-facial-fps-60-color-light-pura-soap-30-ml', 'Protector solar facial FPS 60. Libre de parabenos, cruelty free. Hipoalergénico, apto para pieles sensibles. Dermatológicamente testeado. Libre de gluten y apto veganos. Color Light (claro).', 'PURASOAP', 37500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842186372-zxx6l.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842186372-zxx6l.webp"]', '["vegano","natural","facial"]', 0, 1, 1, '2026-06-07T09:23:44.316069-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3e753ed8-4a6e-4993-911e-63c3672eebb8', 'Kit de limpieza energética', 'kit-de-limpieza-energetica', NULL, 'Satibax', 19500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363389363-3v6nv.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363389363-3v6nv.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363154977-ta58v.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363157545-ikg5s.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363159393-n6hot.webp"]', '[]', 0, 0, 1, '2026-06-01T20:19:26.48477-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('a739c3b0-110c-4176-9c0a-6e88a6800ea0', 'Serum Moisturizer - Ultra Hidratante 30ml', 'serum-moisturizer-ultra-hidratante-30ml', 'Dermatológicamente testeado
3 en 1: Ácido Hialurónico • Vitamina B5 • Vitamina C


¿Qué hace?
Proporciona un efecto glow inmediato, nutre e hidrata en profundidad, atenúa líneas de expresión y mejora la firmeza devolviendo elasticidad a la piel.


Apta para todo tipo de piel, incluso las más delicadas
Serum facial para día y noche

 

Packaging sustentable:

Tapa de bambú natural y envase de vidrio reutilizable de diseño minimalista.


MODO DE USO
Aplicar sobre rostro y cuello con suaves masajes, por la mañana y por la noche.


Fórmula aprobada por médicos y respaldada por estudios clínicos

 


Hipoalergénico - Sin Gluten - Vegano - Sin Parabenos
Sin Petrolatos - Sin Alcohol
_________________________


INGREDIENTES: WATER, PROPYLENE GLYCOL, BUTYLENE GLYCOL, GLYCERIN, POLYSORBATE 80, PHENOXYETHANOL (AND) ETHYLHEXYLGLYCERIN, WATER (AND) SODIUM ASCORBYL PHOSPHATE (AND) ALCOHOL (AND) PHOSPHATIDYLCHOLINE (AND) XANTHAN GUM (AND) CITRIC ACID (AND) POTASSIUM SORBATE (AND) SODIUM BENZOATE (AND) TOCOPHERYL ACETATE, POLYACRYLATE CROSSPOLYMER-6, PANTHENOL, WATER (AND) ALCOHOL (AND) PROPYLENE GLYCOL (AND) GLYCERIN (AND) SODIUM HYALURONATE (AND) PHOSPHOLIPIDS (AND) XANTHAN GUM (AND) SODIUM BENZOATE (AND) POTASSIUM SORBATE (AND) CITRIC ACID (AND) BHT, DISODIUM EDTA, FRAGRANCE, D-LIMONENE.', 'Laima', 35000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821218783-x751k.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821218783-x751k.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821224176-fd0h0.webp"]', '[]', 0, 0, 1, '2026-01-19T14:45:17.874589-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('135626cb-eae0-4888-ac37-a84ec94a6961', 'Bio Bruma Palo Santo, Mirra y Romero', 'bio-bruma-palo-santo-mirra-y-romero', '¿Qué hace? 
Estimula los sentidos y activa la mente brindando una sensación placentera de protección, frescura y bienestar. 
Armoniza mente, cuerpo y espíritu. 

Modo de uso: 

Pulverizar intera sobre la almohada para un mejor descanso. 
Pulverizar sobre la ropa o un pañuelo para mejorar el estado anímico. 

Pulverizar en habitaciones o ambientes de trabajo para mejorar la energia. 

Pulverizar luego de la ducha, es estimulante. 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free - Libre de parabenos 

_________________________

INGREDIENTES: AQUA PURIFIED - ETHANOL - GLYCERIN VEGETABLE - FRAGRANCE - ROSEMARY (ROSMARINUS OFFICINALIS) OIL - ALOE BARBADENSIS EXTRACT - HYDROXYCITRONELLOL - HEXYL CINNAMAL - CITRONELLOL - LIMONENE - LINALOOL - COUMARIN 

  ', 'Laima', 18000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821245533-4sw7e.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821245533-4sw7e.webp"]', '[]', 0, 0, 1, '2026-01-19T14:43:12.736113-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3173016e-642c-4e11-8ca0-36ca89c0285d', 'Agua lavanda bruma', 'agua-lavanda-bruma', '¿Qué hace? 

Nuestra agua es un oasis de frescura y rejuvenecimiento para cuerpo y rostro. Con una fragancia encantadora, ni fuerte ni suave, esta mezcla única refresca, ilumina y revitaliza la piel, ofreciendo una experiencia sensorial incomparable. 

Sus propiedades sedantes y relajantes calman los sentidos mientras mejora el equilibrio hídrico de la piel. Además, los extractos vegetales de regaliz, tilo y manzanilla se unen para hidratar y tonificar, especialmente en pieles fatigadas, mientras que el ácido hialurónico aporta firmeza y elasticidad. 

Modos de uso:

Después de la limpieza, rocía generosamente sobre la piel del rostro y cuerpo para completar el proceso de limpieza y revitalizar la piel. 
Utilízalo a lo largo del día para refrescar la piel y disfrutar de su aroma relajante. 
 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free - Libre de parabenos 

_________________________ 
 

INGREDIENTES: AQUA PURIFIED - GLYCERIN VEGETABLE - FRAGANCE - GLYCYRRHIZA GIABRA EXTRACT - TILIA CORDATA FLOWER EXTRACT - CHAMOMILLA RECUTITA EXTRACT - HYDROLYZED HYALURONATE- 2 METHYL 4 - ISOTHIAZOLIN 3 - ONE - GERANIOL - CITRONELLOL- LIMONENE- LINALOOL- COUMARIN', 'Laima', 18000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821280299-qsk1f.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821280299-qsk1f.webp"]', '[]', 0, 0, 1, '2026-01-19T14:41:35.048599-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('1bd59a82-dcf9-45b4-b1d5-785b45928d09', 'Protector Solar con Color Medio FPS 60 + Activo de Acido Hialuronico', 'protector-solar-con-color-medio-fps-60-activo-de-acido-hialuronico', 'Protegé tu piel todos los días con nuestro  Protector Solar Facial FPS60 con Color BRONZE, un fluido liviano con acabado natural que se adapta perfectamente a tu tono, unifica el color y disimula imperfecciones. Ideal para quienes buscan un protector solar con color, efecto glow y antiage, sin dejar textura seca ni efecto graso, evitando que se marquen las líneas de expresión.

Edad recomendada: Pre-adolecentes

Protege contra rayos UVA y UVB. De acción ultra-hidratante por su fórmula enriquecida con Ectoína (protector activo que actúa sobre los signos del envejecimiento cutáneo) y extractos de células vivas de levaduras, aloe vera, y manteca de karité.

', 'Satibax', 39500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780361876105-hw86g.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780361876105-hw86g.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780361965392-kaxdq.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780361965993-5419k.webp"]', '[]', 0, 0, 1, '2026-06-01T19:59:42.843317-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('d24ea22c-3d8f-4075-b9ad-a8adb8f6d91e', 'Jabón Astringente - 100% Vegetal', 'jabon-astringente-100-vegetal', 'Presentación: Barra x 86 gr

Indicado: para pieles grasas y acneicas. Formulado con Tea Tree Oil y Lemongrass, este jabón actúa como un excelente sanitizante gracias a sus propiedades antisepticas, antibacterianas y calmantes. Su fragancia es elogiada y sorprende a todos.


sin sulfatos –sin petrolatos –sin parabenos –sin dioxido de titanio


sin aditivos artificiales –sin colorantes –sin odoriferos



100% Vegetal – Vegano – Sin TACC


_________________________


INGREDIENTES: SODIUM PALMATE & SODIUM PALM KERNELATE & AQUA (WATER) & GLYCERIN & SODIUM CHLORIDE & SODIUM HYDROXIDE & TETRASODIUM EDTA & TETRASODIUM ETIDRONATE, CYMBOPOGON CITRATUS LEAF OIL, MELALEUCA ALTERNIFOLIA (TEA TREE) OIL (DL-LIMONENE), CAMELLIA SINENSIS LEAF EXTRACT, EDTA, ETIDRONIC ACID, BHT.', 'Laima', 12500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820966694-vnfsn.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820966694-vnfsn.webp"]', '[]', 0, 0, 1, '2026-01-19T14:53:55.388272-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b45b291b-fefd-4704-b843-f5c0ffb728b6', 'Jabón Hidratante - 100% Vegetal', 'jabon-hidratante-100-vegetal', 'Presentación: Barra x 86 gr
Indicado: para todo tipo de piel. Enriquecido con Almendras, Coco y Ylang Ylang, este jabón posee beneficios antibacterianos, limpia en profundidad y promueve la regeneración celular. Un lujo para tu piel.



sin sulfatos –sin petrolatos –sin parabenos –sin dioxido de titanio - sin aditivos artificiales –sin colorantes –sin odoriferos


100% Vegetal – Vegano – Sin TACC


_________________________


INGREDIENTES: SODIUM PALMATE & SODIUM PALM KERNELATE & AQUA (WATER) & GLYCERIN & SODIUM CHLORIDE & SODIUM HYDROXIDE & TETRASODIUM EDTA & TETRASODIUM ETIDRONATE, CANANGA ODORATA FLOWER OIL (LINALOOL, ISOEUGENOL, BENZYL BENZOATE, BENZYL, CINNAMATE, BENZYL SALICYLATE, GERANIOL), PRUNUS AMYGDALUS DULCIS OIL, CUCUMIS SATIVUS (CUCUMBER) FRUIT EXTRACT, COCOS NUCIFERA (COCONUT) FRUIT EXTRACT, EDTA, ETIDRONIC, ACID, BHT.', 'Laima', 12498, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821011446-cuqdp.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821011446-cuqdp.webp"]', '[]', 0, 0, 1, '2026-01-19T14:52:48.748436-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('d7ff296f-07a2-48e5-be27-be962bc6b1cd', 'Agua de rosas', 'agua-de-rosas', '¿Qué hace? 

Nuestra agua es una delicada brisa de frescura y revitalización para el cuerpo y el rostro. Con una fragancia suave, esta fórmula única refresca y rejuvenece la piel, ofreciendo una experiencia sensorial incomparable. 

Infundida con ácido hialurónico y aloe vera, esta agua de rosas hidrata profundamente y calma la piel, dejándola suave, tersa y radiante. El ácido hialurónico proporciona una hidratación intensa, mientras que el aloe vera aporta propiedades calmantes y refrescantes, para una piel revitalizada y rejuvenecida. 

Modos de uso:

Rocía generosamente sobre la piel limpia del rostro y el cuerpo para revitalizar y refrescar la piel.
 
Úsalo a lo largo del día para hidratar y calmar la piel, disfrutando de su fragancia suave y refrescante. 
 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free - Libre de parabenos 

_________________________ 
 

INGREDIENTES: AQUA PURIFIED - GLYCERIN VEGETABLE - FRAGANCE - ROSA CENTIFOLIA EXTRACT- ALOE BARBADENSIS EXTRACT - HYDROLYZED HYALURONATE - 2 - METHYL 4 -  ISOTHIAZOLIN 3 - ONE - GERANIOL. 

  ', 'Laima', 18000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821263881-e329j.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821263881-e329j.webp"]', '[]', 0, 0, 1, '2026-01-19T14:42:14.387803-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('28f9e73f-63f7-49b6-ac49-61424c96d0c0', 'Kit Luz', 'kit-luz', '✨ Kit Luz – Sagrada Madre ✨

Un kit pensado para acompañar procesos de sanación, renovación y expansión, creando momentos de armonía, conexión y bienestar a través de aromas naturales y elementos de sahumado. Ideal para regalar o para realizar rituales de limpieza energética y meditación.  

Contiene:
🌿 1 vela de soja aromática de Oliva y Peonía (160 g)
🌿 4 sahumerios de Rosa y Olíbano
🌿 4 sahumerios de Incienso Blanco
🌿 2 bombitas premium de Lavanda y Olíbano
🌿 1 pastilla de incienso
🌿 1 pastilla de Anís, Canela y Romero
🌿 2 sahumerios triangulares de Sándalo', 'Satibax', 25900, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363664584-h153c.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363664584-h153c.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363590196-0r4dh.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363592492-j0966.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363594154-optzx.webp"]', '[]', 0, 0, 1, '2026-06-01T20:26:51.865349-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('f6962082-2f23-4d10-8b04-4d83bcb39bea', 'Vaso de vidrio + sorbete de vidrio y tapa bambú', 'vaso-de-vidrio-sorbete-de-vidrio-y-tapa-bambu', 'Vaso de Vidrio con Tapa de Bambú y Sorbete de Vidrio

Disfrutá tus bebidas favoritas con un toque natural y elegante. ✨

Este vaso reutilizable está elaborado en vidrio resistente e incluye tapa de bambú y sorbete de vidrio, una combinación práctica, estética y amigable con el medioambiente. Ideal para jugos, licuados, café frío, té helado, agua saborizada y mucho más.

🌿 Incluye:
• Vaso de vidrio transparente
• Tapa de bambú natural
• Sorbete de vidrio reutilizable

💚 Beneficios:
• Reutilizable y ecológico
• Diseño moderno y minimalista
• Fácil de limpiar
• Perfecto para el hogar, la oficina o para regalar

Un básico hermoso para acompañar tus momentos de bienestar y reducir el uso de descartables. ♻️✨
Capacidad 450ML', 'Satibax', 24500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363996969-3pobp.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780363996969-3pobp.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780364000091-kbdco.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780364003019-z2hfc.webp"]', '[]', 0, 0, 1, '2026-06-01T20:34:09.947981-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b1970a54-4876-465a-85d3-c42c01028ea2', 'TOALLITAS HUMEDAS REPELENTE FAMILY', 'toallitas-humedas-repelente-family', 'Toallitas Húmedas Repelentes de Insectos Family TYL x 25 Unidades

Protege tu piel de los insectos de manera práctica y efectiva con las Toallitas Húmedas Repelentes de Insectos Family TYL. Ideales para llevar a cualquier lugar, estas toallitas brindan una barrera protectora contra mosquitos y otros insectos, gracias a su fórmula especial.

✨ Beneficios:
✔ Protección contra insectos en cualquier momento.
✔ Fácil aplicación sin necesidad de aerosoles ni cremas.
✔ Suaves con la piel y de agradable aroma.
✔ Formato práctico para transportar en la mochila, cartera o auto.

📦 Presentación: 25 toallitas húmedas.
🛡 Modo de uso: Pasar suavemente sobre la piel expuesta hasta cubrir toda la superficie.', 'THELMA&LOUISE', 13000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331001691-65klm.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331001691-65klm.webp"]', '[]', 0, 0, 1, '2026-01-19T22:52:04.796487-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3a9d9c7e-a23f-4213-b5a5-51a75245e8e7', 'Aceite Capilar Con CBD - Nutrición Hasta Las Puntas', 'aceite-capilar-con-cbd-nutricion-hasta-las-puntas', 'Línea CBD
Aceite Capilar con CBD "Nutrición hasta las puntas"

Ideal para combatir los problemas capilares, en especial para prevenir la caída del cabello. ¡Mantené tu cuero cabelludo sano, con pelo fuerte y sedoso!

Formulado con CBD, Aceite de Argán y Aceite Esencial Melisa. Ayuda a todo tipo de cabello a recuperar su fuerza. Las propiedades antiinflamatorias del CBD ayudan a calmar la picazón y molestias en general del cuero cabelludo, reduciendo la irritación y la sequedad. Brinda suavidad y elasticidad a la fibra capilar. Protege la cutícula aportando brillo sin efecto graso.

¡Para todo tipo de cabello! Seco, graso, equilibrado, mixto, con rulos.

Uso diario: Con el cabello limpio y seco aplicar poca cantidad en largo y puntas. No necesita enjuague.
Uso frecuente: Aplicar como mascarilla sobre el cuero cabelludo con suaves masajes y extender hasta las puntas. Luego de quince minutos, enjuagar con tu shampoo habitual.

Ingredientes: Argania Spinosa Kernel, Oil, Cannabidiol, locopheryl acetate, Melisa Officinalis leaf Oil, Geraniol, Linalool, Hydrocitrone-Hal, Citral, Coumarin.

Envase de vidrio reutilizable de 30ml. Caja reciclable. Packaging compostable y biodegradable.
Producto inscripto en ANMAT. ', 'SENTIDA BOTANICA', 25000, '5830755b-43b1-4ef9-93aa-aa337a263bfd', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820808339-jvjm7.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820808339-jvjm7.webp"]', '[]', 0, 0, 1, '2026-01-27T07:35:41.103912-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('2336725e-0aed-492a-af7e-8f6c77dce09f', 'Aceite con CBD RELAX Corporal Hidratante - GOTERO 30ml', 'aceite-con-cbd-relax-corporal-hidratante-gotero-30ml', 'Línea CBD

Aceite Corporal Hidratante Relax con CBD - GOTERO 30ml

 

¡Aceite especial para masajes localizados! Proporciona alivio a los músculos y las articulaciones.

 

Formulado con CBD, Aceite de Árnica y Aceite Esencial Melisa.

El aceite de árnica es conocido por sus propiedades antiinflamatorias y analgésicas. El CBD, por su parte, ayuda a reducir la tensión muscular y mejorar la sensación de relajación.

 

Modo de uso: aplicar sobre la zona a tratar con suaves masajes. Repetir todas las veces que se desee.

 

Ingredientes: Olea europaea (olive) fruit oil, Betula alba extract,Helianthus annus (sunflower) seed oil, Arachis Hypogaea Fruit Extract ,Calendula Officinalis flower extract, Capsicum Annuum Fruit Extract , Arnica Montana Flower Oil, Cannabidiol, Tocopheryl acetate, Melisa Officinalis leaf Oil, Geraniol, Linalool, Hydrocitronellal, Citral, Coumarin. 

Envase de vidrio reutilizable con gotero de 30ml. Caja reciclable. Packaging compostable biodegradable.

Producto inscripto en ANMAT.', 'SENTIDA BOTANICA', 35000, '5830755b-43b1-4ef9-93aa-aa337a263bfd', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820836055-wge6y.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820836055-wge6y.webp"]', '[]', 0, 0, 1, '2026-01-27T07:34:58.54027-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('8682300e-f238-474a-8ba6-4f2df446cf3a', 'Kit Pausa Bonita', 'kit-pausa-bonita', 'KIT PAUSA BONITA ✨

Un pequeño ritual de cuidado para llevar siempre con vos.

Este kit fue pensado para acompañarte en el día a día con detalles prácticos, lindos y funcionales que ayudan a crear momentos de bienestar en cualquier lugar.

Incluye:

🌿 Bolsita de algodón reutilizable con cordón regulable.
🌿 Bálsamo labial sabor chicle.
🌿 Crema de manos con llavero para llevar en la cartera, mochila o neceser.
🌿 Ringo Eco Flip, práctico soporte plegable para celular o tablet.
🌿 Llavero decorativo.
🌿 2 borlas de maquillaje para aplicar polvo facial o realizar pequeños retoques.
🌿 2 toallitas comprimidas que se expanden al contacto con el agua.
🌿 2 pads para contorno de ojos, ideales para utilizar con sérums, tónicos o tratamientos hidratantes.

Un kit versátil, delicado y lleno de pequeños tesoros para regalar o regalarte.

Ideal para llevar en la cartera, tener en el trabajo, viajar o sorprender a alguien especial con un detalle útil y original.', 'Satibax', 28000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527004358-we8yp.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527004358-we8yp.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527006475-g1ddh.webp"]', '["kit-regalo"]', 0, 0, 1, '2026-06-03T17:51:47.958669-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('f276d213-25ff-4595-bb05-5a170e1b4036', 'SHAMPOO SÓLIDO - FORTALECEDOR - 100g', 'shampoo-solido-fortalecedor-100g', 'Línea Capilar
Shampoo sólido fortalecedor

¡Detiene la caída del cabello, favoreciendo la irrigaciòn sanguínea y el crecimiento capilar!

Formulado con Cocoil Isetionato de Sodio (tensioactivo natural derivado del coco), Aceite de coco, Aceite de Argán, Aceite Esencial de Romero.

¿Cómo usarlo?
Hacer espuma con las manos o pasar la pastilla por el cabello previamente humedecido. Al sentir el cabello humectado, dejar la pastilla y masajear. No es necesario usar mucha cantidad, produce mucha espuma. Luego enguajar con abundante agua.
¡Podés utilizar nuestro Acondicionador Sólido para desenredar y suavizar el cabello!

Importante: NO requiere período de adaptación. Está formulado especialmente para el PH del cuero cabelludo. ¡Tu pelo quedará limpio y sedoso desde el primer lavado! 

Nuestro shampoo sólido apuesta a un cambio, sano, ecológico y sustentable, sin usar envases plásticos ni exceso de packaging. Por eso te recomendamos que luego de usarlo, lo dejes en un lugar seco, para que pueda mantenerse mejor y por más tiempo. Dependiendo de la duración de los lavados y del largo del cabello, la pastilla puede durar entre 80 y 90 lavados.

Ingredientes: Sodium cocoyl isethionate, Water, Cocos Nucifera (Coconut) Oil, Argania Spinosa Kernel Oil, Rosmarinus Officinalis Essential Oil, Benzyl Alcohol, Benzoic Acid, Tocoferol Acetate.

Producto aprobado por ANMAT. Sin TACC y apto bebés y niños a partir de los 6 meses. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.
Packaging compostable.
Pastilla de 100g.

¡Conocé nuestras opciones para todo tipo de cabello!', 'SENTIDABOTANICA', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820609332-qtgce.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820609332-qtgce.webp"]', '[]', 0, 0, 1, '2026-01-27T07:46:27.192203-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('e2ace679-cb85-4843-9aea-02c29553a25c', 'Kit Esencia Natural', 'kit-esencia-natural', 'Kit Aromas que Abrazan

Un detalle especial para regalar bienestar, armonía y momentos de conexión.

Este kit combina aromas envolventes y elementos decorativos cuidadosamente seleccionados para crear una experiencia única en cualquier espacio. Ideal para quienes disfrutan de los rituales de relajación, la decoración consciente y los pequeños momentos de pausa.

🌿 Incluye:
• Cajoncito de madera pintado artesanalmente
• Conitos aromáticos Sagrada Madre Cannabis THC
• Frasco de vidrio con tapa de corcho
• Flor difusora decorativa

✨ Ideal para:
• Regalos de cumpleaños
• Obsequios empresariales
• Souvenirs especiales
• Decorar y aromatizar espacios

Cada kit está preparado con dedicación para transformar cualquier rincón en un pequeño refugio de bienestar.

💚 Un regalo original, decorativo y lleno de intención.', 'Satibax', 12500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780365089730-zqeig.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780365089730-zqeig.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780364942781-jwt5m.webp"]', '[]', 1, 0, 1, '2026-06-01T20:52:28.313101-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('dfdc05e4-ac18-4e0e-8029-e9d522192bee', 'ALQUIMIA Eau de Parfum · 15 ml', 'ssav', 'ALQUIMIA Eau de Parfum · 15 ml

Un perfume profundo, cautivador y lleno de personalidad. ALQUIMIA está inspirado en el poder de la transformación, en esos momentos que dejan huella y convierten lo cotidiano en algo extraordinario.

Su combinación de notas cítricas, dulces y amaderadas crea una fragancia envolvente que despierta los sentidos y acompaña con elegancia cada instante del día.

✨ Notas destacadas
• Bergamota
• Madera de oud
• Vainilla
• Azúcar negra
• Patchouli

El resultado es un aroma cálido, misterioso y sofisticado, ideal para quienes disfrutan de fragancias intensas, memorables y con carácter propio.

🌿 Formato práctico
Su presentación de 15 ml es perfecta para llevar en la cartera, el bolso o tener siempre a mano para renovar tu aroma cuando lo desees.

💫 Una experiencia sensorial única
ALQUIMIA combina frescura, profundidad y dulzura en una fragancia diseñada para acompañarte, inspirarte y destacar tu esencia.

💚 Belleza consciente
Producto vegano, libre de parabenos y cruelty free. Una elección responsable para quienes buscan calidad, bienestar y respeto por el entorno.

Una fragancia que transforma cada momento en algo especial.', 'Vgreen', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842611633-bipng.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842611633-bipng.webp"]', '["natural","vegano","aroma"]', 1, 0, 1, '2026-06-07T09:30:24.088528-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('6f95df25-ed08-48c2-9549-bde889952562', 'Body Mist Cítrico – Fragancia Unisex Irresistible y Energizante', 'fragancia-unisex-irresistible-y-energizante-vegano', 'Experimenta la energía y vitalidad del Body Mist Cítrico THE PURE, una fragancia unisex que combina notas frescas y alegres de té verde, papaya y cedro con el toque delicado de jazmín y almizcle. Este body mist cítrico de alta concentración ofrece una duración prolongada de más de 6 horas para que te sientas fresco y renovado durante todo el día.

Formulado sin petrolatos, sulfatos ni parabenos, y con certificación cruelty free y vegana, este spray corporal cuida tu piel mientras potencia tu aroma natural. Ideal para quienes buscan un perfume ligero, duradero y refrescante.', 'PURASOAP', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841147196-3w20i.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841147196-3w20i.webp"]', '["vegano","natural","aroma"]', 0, 1, 1, '2026-06-07T09:06:51.779414-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b3b6f861-f78f-49db-86ab-cad501a895fb', 'Duo de Bálsamos Labiales Con Color Rosa y Nude', 'duo-de-balsamos-labiales-con-color-rosa-y-nude', 'Descubrí el dúo irresistible de bálsamos labiales con Color Nude | Chocolate y Rosa |Chicle , diseñados para brindar una hidratación sublime y un color vibrante que dura todo el día. Estos bálsamos premium están formulados con ingredientes naturales y veganos que nutren profundamente tus labios, dejándolos suaves, protegidos y con un brillo radiante.

Ideales para labios secos, agrietados o apagados, ofrecen una hidratación intensiva de hasta 24 horas, ayudando a restaurar la suavidad y el confort desde la primera aplicación

Sin parabenos ni crueldad animal, este dúo es ideal para pieles sensibles y para quienes buscan un cuidado labial consciente y efectivo. Elevá tu rutina de belleza con este dúo de bálsamos que protege, hidrata y embellece.', 'PURASOAP', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841680835-oku39.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841680835-oku39.webp"]', '["natural","vegano"]', 0, 0, 1, '2026-06-07T09:15:09.827141-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('25d0685c-9ca8-46a7-8002-e452c6b8c5c5', 'Protector Solar con Color Bronze FPS 60 + Activo de Acido Hialuronico –', 'protector-solar-con-color-bronze-fps-60-activo-de-acido-hialuronico', 'Protegé tu piel todos los días con nuestro  Protector Solar Facial FPS60 con Color Medio, un fluido liviano con acabado natural que se adapta perfectamente a tu tono, unifica el color y disimula imperfecciones. Ideal para quienes buscan un protector solar con color, efecto glow y antiage, sin dejar textura seca ni efecto graso, evitando que se marquen las líneas de expresión.

Edad recomendada: Pre-adolecentes

Protege contra rayos UVA y UVB. De acción ultra-hidratante por su fórmula enriquecida con Ectoína (protector activo que actúa sobre los signos del envejecimiento cutáneo) y extractos de células vivas de levaduras, aloe vera, y manteca de karité.

', 'PURASOAP', 37500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841997384-fwdgz.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841997384-fwdgz.webp"]', '["vegano","natural","facial","celiacosafe"]', 0, 1, 1, '2026-06-07T09:21:16.680485-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('1546e309-0e32-4cda-9f61-9bb4cae5f112', 'Humidificador + Esencia Rosa', 'humidificador-esencia', 'Humidificador + esencia 
Sujeto a disponibilidad de stock', 'Satibax', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780441093029-en5b0.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780441093029-en5b0.webp"]', '["kit-regalo","aroma"]', 0, 0, 1, '2026-06-02T17:59:48.44427-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('f938b17d-b887-4150-824b-242241db2e72', 'ACONDICIONADOR SÓLIDO - 100g', 'acondicionador-solido-100g', 'Línea Capilar
Acondicionador sólido

¡Nutrí tu cabello, dejándolo suave y sedoso de manera natural, sin efecto graso!

Formulado con BTMS, Manteca de cacao, enriquecido con aceite de coco y aceite de jojoba.

¿Cómo usarlo?
Al finalizar el lavado con shampoo y su posterior enjuague, pasar la pastilla de Acondicionador Sólido una o dos veces en el largo y puntas del cabello, ya que es super concentrado. Desenredar el cabello acompañando con los dedos y luego enjuagar con agua tibia.

¡Doble funcion, acondicionador y mascarilla capilar!

Mascarilla capilar: Una o dos veces al mes, aplicar el producto y dejar actuar por 15 minutos. Luego enjuagar con abundante agua. Acción super nutritiva y reparadora.

Nuestro acondicionador sólido apuesta a un cambio, sano, ecológico y sustentable, sin usar envases plásticos ni exceso de packaging. Por eso te recomendamos que luego de usarlo, lo dejes en un lugar seco, para que pueda mantenerse mejor y por más tiempo. Dependiendo de la duración de los lavados y del largo del cabello, la pastilla puede durar... ¡Hasta 100 lavados!

Producto aprobado por ANMAT. Sin TACC y apto bebés y niños a partir de los 6 meses. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.
Packaging compostable.

Ingredientes/Ingredients: Behentrimonium Methosulfate (and) Cetearyl Alcohol, Theobroma Cacao Deed Butter, Cocos Nucifera (Coconut) Oil, Jojoba (Buxus Chinensis) Oil, Tocopherol Acetate.

Pastilla de 100g.', 'SB', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818504452-npcvs.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818504452-npcvs.webp"]', '[]', 0, 0, 1, '2026-01-27T07:50:17.175812-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('86f36754-af63-40d4-970c-19ed205261d8', 'SHAMPOO SÓLIDO - CABELLO SECO - 100g', 'shampoo-solido-cabello-seco-100g', 'Línea Capilar
Shampoo sólido para cabello seco

Humecta en profundidad el cabello y el cuero cabelludo, aliviando la resequedad. ¡Es ideal para cabellos maltratados, teñidos o con frizz, cabellos con tratamientos capilares y cabellos con rulos! 

Formulado con Cocoil Isetionato de Sodio (tensioactivo natural derivado del coco), Aceite de coco, Aceite de Argán y Aceite Esencial de Lavanda.

¿Cómo usarlo?
Hacer espuma con las manos o pasar la pastilla por el cabello previamente humedecido. Al sentir el cabello humectado, dejar la pastilla y masajear. No es necesario usar mucha cantidad, produce mucha espuma. Luego enguajar con abundante agua.
Podés utilizar nuestro Acondicionador Sólido para desenredar y suavizar el cabello.

Importante: NO requiere período de adaptación. Está formulado especialmente para el PH del cuero cabelludo. ¡Tu pelo quedará limpio y sedoso desde el primer lavado! 

Nuestro shampoo sólido apuesta a un cambio, sano, ecológico y sustentable, sin usar envases plásticos ni exceso de packaging. Por eso te recomendamos que luego de usarlo, lo dejes en un lugar seco, para que pueda mantenerse mejor y por más tiempo. Dependiendo de la duración de los lavados y del largo del cabello, la pastilla puede durar entre 80 y 90 lavados.

Ingredientes/Ingredients: Sodium cocoyl isethionate, Water, Cocos Nucifera (Coconut) Oil, Argania Spinosa Kernel Oil, Lavandula angustifolia officinalis oil, Benzyl Alcohol, Benzoic Acid, Tocoferol Acetate, d-limonene, Farnesol, Geraniol, Linalool.

Producto aprobado por ANMAT. Sin TACC y apto bebés y niños a partir de los 6 meses. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.
Packaging compostable.
Pastilla de 100g.

¡Conocé nuestras opciones para todo tipo de cabello!', 'SB', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818552001-psxr9.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818552001-psxr9.webp"]', '[]', 0, 0, 1, '2026-01-27T07:49:44.861725-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('77e26652-81cb-4505-b106-d8aa548133f6', 'Kit amuleto de perlas', 'kit-amuleto-de-perlas', '✨ AMULETO DE PERLAS ✨

Un pequeño tesoro pensado para acompañarte con belleza, suavidad y detalles que transforman lo cotidiano en algo especial.

Este kit reúne accesorios delicados y elementos de autocuidado para crear una experiencia práctica, elegante y encantadora. Ideal para regalar o regalarte un momento de mimo.

Incluye:

🌿 Bolsita de algodón reutilizable con cordón regulable.
🌿 Collar de perlas.
🌿 Pulsera de perlas.
🌿 Llavero decorativo.
🌿 Bálsamo labial Sentida Botánica.
🌿 Borla de maquillaje para aplicación de polvo facial.
🌿 2 pads para contorno de ojos, ideales para utilizar con sérums o tratamientos hidratantes.
🌿 2 toallitas comprimidas que se expanden al contacto con el agua.

Un kit delicado y versátil que combina cuidado personal y pequeños accesorios para acompañarte cada día.

Perfecto para llevar en la cartera, tener siempre a mano o sorprender a alguien con un detalle especial.

✨ Pequeños tesoros que iluminan los rituales de todos los días.', 'Satibax', 22500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527655248-erg2t.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527655248-erg2t.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527657064-qdrnp.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780527659089-9jv8j.webp"]', '["kit-regalo"]', 0, 0, 1, '2026-06-03T18:01:45.657923-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('00db5ebd-bc1a-4b14-8bf0-1c0c4c681ed2', 'SHAMPOO SÓLIDO - CABELLO GRASO/ANTICASPA - 100g', 'shampoo-solido-cabello-graso-anticaspa-100g', 'Línea Capilar
Shampoo sólido para cabello graso/anticaspa

¡Elimina la grasitud y barre la caspa!

Formulado con Cocoil Isetionato de Sodio (tensioactivo natural derivado del coco), Aceite de coco, enriquecido con aceite de ricino y aceite esencial de limòn. 

¿Cómo usarlo?
Hacer espuma con las manos o pasar la pastilla por el cabello previamente humedecido. Al sentir el cabello humectado, dejar la pastilla y masajear. No es necesario usar mucha cantidad, produce mucha espuma. Luego enguajar con abundante agua.
Podés utilizar nuestro Acondicionador Sólido para desenredar y suavizar el cabello.

Importante: NO requiere período de adaptación. Está formulado especialmente para el PH del cuero cabelludo. ¡Tu pelo quedará limpio y sedoso desde el primer lavado! 

Nuestro shampoo sólido apuesta a un cambio, sano, ecológico y sustentable, sin usar envases plásticos ni exceso de packaging. Por eso te recomendamos que luego de usarlo, lo dejes en un lugar seco, para que pueda mantenerse mejor y por más tiempo. Dependiendo de la duración de los lavados y del largo del cabello, la pastilla puede durar entre 80 y 90 lavados.

Ingredientes: Sodium cocoyl isethionate, Water, Cocos Nucifera (Coconut) Oil, Castor Oil (Ricinus Communis), Citrus Limonum oil, Benzyl Alcohol, Benzoic Acid, Tocoferol Acetate, Citral, Geraniol, d-Limonene.

Producto aprobado por ANMAT. Sin TACC y apto bebés y niños a partir de los 6 meses. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.
Packaging compostable.
Pastilla de 100g.

¡Conocé nuestras opciones para todo tipo de cabello!', 'SB', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818675910-14xuz.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818675910-14xuz.webp"]', '[]', 0, 0, 1, '2026-01-27T07:49:09.357525-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('13556418-cc3d-48cb-aad0-bc996648be70', 'Body Mist Dulce – Fragancia Irresistible y Avainillada de Alta Duración', 'fragancia-irresistible-y-avainillada-de-alta-duracion', 'Audace es un perfume de alta concentración inspirado en el icónico Olympea de Paco Rabanne, una fragancia que equilibra la fuerza y la sensualidad femenina. Su aroma combina acordes florales, dulces y amaderados que envuelven la piel con elegancia y duración excepcional.

-Más de 8 horas de duración.

Notas olfativas:

Salida: mandarina verde, jazmín acuático y flor de jengibre
Corazón: vainilla salada y lirio
Fondo: madera de cachemira, ámbar gris y sándalo', 'PURASOAP', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780840963356-udxvn.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780840963356-udxvn.webp"]', '["natural","aroma","vegano"]', 0, 1, 1, '2026-06-07T09:05:14.248064-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7eca3845-6c77-4f02-a818-57ef9d5cad30', 'Body Mist Rouge– Irresistible Fragancia Intensa de Larga Duración', 'irresistible-fragancia-intensa-de-larga-duracion', 'Sumergite en la frescura y sensualidad de una fragancia única. Su salida cítrica de flor de azahar y bergamota se funde con un corazón floral de jazmín, nardos y nardo real, para finalmente envolver la piel en la calidez de la vainilla Bourbon, almizcle blanco y cedro.

De alta concentración, este body mist deja un aroma floral, femenino y romántico, ideal para usar en cualquier momento del día. ¡Perfecto para llevar siempre en tu cartera y renovarte con un toque de elegancia en cada aplicación! 🌸✨', 'PURASOAP', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841246443-6v8lj.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841246443-6v8lj.webp"]', '["natural","aroma","vegano"]', 0, 1, 1, '2026-06-07T09:08:12.315394-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('e17c88a1-9773-4784-b94b-5dee700d0acb', 'Humidificador + Esencia Gris', 'humidificador-esencia-gris', NULL, 'Satibax', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448583385-q8liw.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448583385-q8liw.webp"]', '["kit-regalo","aroma"]', 0, 0, 1, '2026-06-02T20:04:43.201877-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('36b454ef-cbc5-4c87-811b-1ccd672079f3', 'Crema bifásica', 'crema-bifasica', NULL, 'Satibax', 15000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675314218-eyw1j.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675314218-eyw1j.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675327409-txsjy.webp"]', '[]', 0, 0, 1, '2026-06-05T11:06:52.478129-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('4eb51207-b109-496b-8bd8-205eff8dea81', 'MINI SPRAY AIRE LIBRE - AHUYENTA MOSQUITOS', 'mini-spray-aire-libre-ahuyenta-mosquitos', 'Línea Corporal
Mini Spray Aire Libre Ahuyenta Mosquitos

Ahuyenta mosquitos ¡100% Natural! Presentación mini, para que lo lleves siempre con vos.

Elaborado con aceite esencial de Citronella y Eucalipto sobre una base de alcohol de cereal.

¿Cómo usarlo?
Aplicar a 15cm de la piel. Reiterar su uso las veces que sea necesario.
No aplicar sobre el rostro o piel lastimada/irritada.
No recomendado para bebés menores de 6 meses.

INGREDIENTES: ALCOHOL, CYMBOPONGO WINTERIANUS LEAF OIL, EUCALIPTUS GLOBULUS LEAF OIL, CITRONELLOL, EUGENOL, GERANIOL, FARNESOL. Envase de vidrio reutilizable. Spray de 60ml. Producto aprobado por ANMAT. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.', 'SB', 8000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818308214-fe4iv.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818308214-fe4iv.webp"]', '[]', 0, 0, 1, '2026-01-27T13:12:21.025822-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('e773d286-0921-42ae-a49b-2beebf96ef9b', 'SPRAY AIRE LIBRE - AHUYENTA MOSQUITOS', 'spray-aire-libre-ahuyenta-mosquitos', 'Línea Corporal
Spray Aire Libre Ahuyenta Mosquitos

Ahuyenta mosquitos ¡100% Natural!

Elaborado con aceite esencial de Citronella y Eucalipto sobre una base de alcohol de cereal.

¿Cómo usarlo?
Aplicar a 15cm de la piel. Reiterar su uso las veces que sea necesario.
No aplicar sobre el rostro o piel lastimada/irritada.
No recomendado para bebés menores de 6 meses.

INGREDIENTES: ALCOHOL, CYMBOPONGO WINTERIANUS LEAF OIL, EUCALIPTUS GLOBULUS LEAF OIL, CITRONELLOL, EUGENOL, GERANIOL, FARNESOL. Envase de vidrio reutilizable. Spray de 120ml. Producto aprobado por ANMAT. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.', 'SB', 12000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818364401-7lv6y.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818364401-7lv6y.webp"]', '[]', 0, 0, 1, '2026-01-27T13:11:46.002626-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('5219bda0-dd39-4f11-a7f4-2a89936cd080', 'Body Mist Floral – Irresistible Fragancia Intensa de Larga Duración VEGANO', 'body-mist-floral-irresistible-fragancia-intensa-de-larga-duracion-vegano', 'Descubrí el poder de la alta perfumería con nuestro body mist floral Le FLEURS, una bruma corporal con extractos importados y fragancia de larga duración (más de 6 horas).
Su exquisita fórmula fusiona la frescura de la flor de azahar del naranjo y la bergamota, con el corazón sensual del nardo y notas cálidas de vainilla bourbon, almizcle blanco y cedro. Inspirado en perfumes de lujo como My Way, este body mist es el toque final perfecto para tu rutina de cuidado personal.

Ideal como regalo o para convertirlo en tu nueva fragancia de uso diario.', 'PURASOAP', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841389273-fglhp.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841389273-fglhp.webp"]', '["vegano","natural"]', 0, 1, 1, '2026-06-07T09:09:57.544531-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('f71cf71f-b57c-4ffc-b64b-b43f999bb442', 'Jabón Relajante - 100% Vegetal', 'jabon-relajante-100-vegetal', 'Presentación: Barra x 86 gr

Indicado: para todo tipo de piel. Enriquecido con aceite de lavanda, aloe vera y extracto de rosa mosqueta, se destaca por su acción relajantes, calmante y tonificante. Disfruta de una limpieza suave mientras te sumerges en el aroma reconfortante de la lavanda.


sin sulfatos –sin petrolatos –sin parabenos –sin dioxido de titanio - sin aditivos artificiales –sin colorantes –sin odoriferos


100% Vegetal – Vegano – Sin TACC


_________________________


INGREDIENTES: SODIUM PALMATE & SODIUM PALM KERNELATE & AQUA (WATER) & GLYCERIN & SODIUM CHLORIDE & SODIUM HYDROXIDE & TETRASODIUM EDTA & TETRASODIUM ETIDRONATE, LAVANDULA ANGUSTIFOLIA (LAVENDER) OIL (LINALOOL), ROSA MOSCHATA LEAF EXTRACT, ALOE BARBADENDIS EXTRACT, EDT, ETIDRONIC, ACID, BHT.', 'Laima', 12500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820941729-4c0jz.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820941729-4c0jz.webp"]', '[]', 0, 0, 1, '2026-01-19T14:54:38.649785-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3a7670a0-8a63-473c-afd9-df91b456adbe', 'Crema Corporal TODO TIPO DE PIEL', 'crema-corporal-todo-tipo-de-piel', 'Línea Corporal
Crema Corporal ¡Para todo tipo de piel!

Elaborada para adaptarse a todo tipo de piel, aportando hidratación, elasticidad y suavidad.
Su fórmula a base de Manteca de Karité y Aloe Vera, enriquecida con vitamina E, brinda un cuidado natural para vivir y sentir una piel saludable.


Cremas que nutren nuestra piel y nuestra esencia natural. Inspirada en las texturas y aromas que la tierra nos ofrece, generando una experiencia sensorial única.
Cada variedad es una porción de naturaleza especialmente diseñada para cuidar tu piel, manteniendo la conexión natural con nuestro planeta.
Para una piel naturalmente Sentida.

Presentaciones uniflorales de Madreselva y Violeta.


INGREDIENTES:WATER, CETEARYL OLVATE AND SORBITAN OLIVATE, ABYSSINIAN OIL SIMMONDSIA CHINENSIS SEED OIL, GLYCERIN, SHEA BUTTER (BUTYROSPERMUM PARKII), PANTHENOL, FRAGANCE, TOCOPHEROL ACETATE, SODIUM BENZOATE AND POTASSIUM SORBATE, CITRIC ACID. MAN CONTAIN: DENZYL BENZOATE, BENZYL SALICYLATE, BENZYL ALCOHOL. HYDROXYCITRONELLAL, BUTYLPHENYL METHYL PROPIONAL, LINALOOL, HEXYL CINNAMAL.
Producto aprobado por ANMAT. Sin TACC. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. Sin aceite de palma.

Envase de vidrio reutilizable con válvula dosificadora de 250ml.', 'SB', 28000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1775159318960-b07un.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1775159318960-b07un.webp"]', '[]', 0, 0, 1, '2026-01-27T13:09:36.018389-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3f552fe4-70d3-40a7-ac64-ecefd57f0229', 'Jabón Neutro Hipoalergénico - 100% Vegetal', 'jabon-neutro-hipoalergenico-100-vegetal', 'Presentación: Barra x 86 gr

Indicado: para aquellos con piel delicada y propensa a alergias. Formulado con Aceite de Jojoba, este jabón proporciona una limpieza suave y sin irritaciones. Además de eliminar impurezas, humecta, nutre y suaviza la piel, dejándola radiante y saludable.


sin sulfatos –sin petrolatos –sin parabenos –sin dioxido de titanio - sin aditivos artificiales –sin colorantes –sin odoriferos


100% Vegetal – Vegano – Sin TACC


_________________________


INGREDIENTES: SODIUM PALMATE & SODIUM PALM KERNELATE & AQUA (WATER) & GLYCERIN & SODIUM CHLORIDE & SODIUM HYDROXIDE & TETRASODIUM EDTA & TETRASODIUM ETIDRONATE, SIMMONDSIA CHINENSIS SEED OIL, EDTA, ETIDRONIC, ACID, BHT', 'Laima', 12500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820908576-qa7qn.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820908576-qa7qn.webp"]', '[]', 0, 0, 1, '2026-01-19T14:55:05.182937-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('56c49bda-4740-46d5-9658-3fb8a08c179e', 'Aceite de Ricino 45mL', 'aceite-de-ricino-45ml', 'Aceite de Ricino

¡Cuidado para tu cabello, pestañas, cejas y uñas! Ayuda a regenerar la piel y colabora mejorando el aspecto de las cicatrices.

¿Cuáles son las propiedades del ricino?
Es rico en Omega 9 y vitamina E. Fortalece las uñas quebradizas o débiles. Estimula el crecimiento del cabello y colabora en problemas como la caspa. Ideal para cabello seco. Ayuda en el crecimiento de las pestañas y cejas, las nutre y les brinda mayor densidad.

¿Cómo usarlo?
Para estimular el crecimiento del cabello: Con las yemas de los dedos aplicar unas gotas de Aceite de Ricino en las raíces y el cuero cabelludo distribuyendo en forma pareja. Masajear suavemente durante unos minutos en raíces y cubrir con un gorro o toalla. Dejar actuar 30 minutos. Lavar con shampú y secar en forma habitual. Repetir 2 o 3 veces por semana.

Para fortalecer pestañas y cejas: Aplicar sobre las pestañas y cejas limpias y secas con un hisopo, algodoncito o un cepillito durante las noches luego de retirar el maquillaje. No necesita enjuagar. Se puede aplicar 1 o 2 veces por semana como plan de mantenimiento para espesar pestañas y cejas, también para engrosas y dar volumen.

Para fortalecer uñas quebradizas y débiles: Una pequeña cantidad es suficiente para hidratar las cutículas y uñas con suaves masajes hasta su total absorción. Puede aplicarse directamente con los dedos, paño o algodón.

Para mejorar el aspecto de cicatrices: El Aceite de Ricino suaviza la piel y ayuda a remover el tejido de la cicatriz profunda para que pueda ser también suavizada. Desinflama el tejido subcutáneo mejorando en forma notable el aspecto de las cicatrices. Repetir 2 o 3 veces por semana.

Ingredientes: Ricinus Communis (Castor) Oil.

Envase de vidrio reutilizable con insertogotero de 45ml', 'SB', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1775159197824-j6y6o.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1775159197824-j6y6o.webp"]', '[]', 0, 0, 1, '2026-01-27T07:51:13.809183-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b47d0cc4-323b-46cc-bae5-6cf90c62b5d1', 'SHAMPOO SÓLIDO - CABELLO EQUILIBRADO - 100g', 'shampoo-solido-cabello-equilibrado-100g', 'Línea Capilar
Shampoo sólido para cabello equilibrado

¡Nutrí e hidratá tu cabello! 

Formulado con Cocoil Isetionato de Sódio (tensioactivo natural derivado del coco), Aceite de coco, enriquecido con Manteca de Karité.

¿Cómo usarlo?
Hacer espuma con las manos o pasar la pastilla por el cabello previamente humedecido. Al sentir el cabello humectado, dejar la pastilla y masajear. No es necesario usar mucha cantidad, produce mucha espuma. Luego enguajar con abundante agua.
Podés utilizar nuestro Acondicionador Sólido para desenredar y suavizar el cabello.

Importante: NO requiere período de adaptación. Está formulado especialmente para el PH del cuero cabelludo. ¡Tu pelo quedará limpio y sedoso desde el primer lavado! 

Nuestro shampoo sólido apuesta a un cambio, sano, ecológico y sustentable, sin usar envases plásticos ni exceso de packaging. Por eso te recomendamos que luego de usarlo, lo dejes en un lugar seco, para que pueda mantenerse mejor y por más tiempo. Dependiendo de la duración de los lavados y del largo del cabello, la pastilla puede durar entre 80 y 90 lavados.

Ingredientes/Ingredients: Sodium cocoyl isethionate, Water, Cocos Nucifera (Coconut) Oil, Shea Butter (Butyruspermum Parkii), Parfum, Benzyl Alcohol, Benzoic Acid, Tocoferol Acetate, Benzyl Benzoate, Coumarin.

Producto aprobado por ANMAT. Sin TACC y apto bebés y niños a partir de los 6 meses. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. SIN ACEITE DE PALMA.
Packaging compostable.
Pastilla de 100g.

¡Conocé nuestras opciones para todo tipo de cabello!', 'SB', 22000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820580707-5xnfc.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820580707-5xnfc.webp"]', '[]', 0, 0, 1, '2026-01-27T07:48:31.400625-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('6ae3768b-1159-4162-8d98-85208c897d7d', 'Aceite Facial Con CBD - Hidratante y Regenerador', 'aceite-facial-con-cbd-hidratante-y-regenerador', 'Línea CBD
Aceite Facial Hidratante y Regenerador con CBD

Hidrata profundamente, nutriendo la piel y ayudando a mantenerla suave y flexible.
¡Incorporalo a tu skincare facial!

Formulado con CBD, Aceite Orgánico Rosa Mosqueta, Aceite de Almendras, y Aceite Esencial Melisa. El aceite de rosa mosqueta posee propiedades regenerativas y puede ayudar a mejorar la textura de la piel, reducir las arrugas y promover un cutis más radiante. El CBD, por su parte, contribuye a calmar la piel, reduciendo la inflamación y proporcionando alivio a posibles irritaciones cutáneas. Puede utilizarse como hidratante diario, suero rejuvenecedor o incluso como tratamiento intensivo para nutrir la piel durante la noche.

¿Cómo funciona en cada tipo de piel?
Piel seca: Mejora la hidratación de la piel gracias a su alto contenido de omega-3, omega-6 y vitamina E.
Piel grasa/mixta/acné: Regula la producción de sebo cutáneo.
Piel delicada: Ayuda a disminuir rojeces.

Uso diario: Aplicar sobre el rostro limpio y seco hasta su total absorción y luego continuar con la rutina habitual de cuidado facial.
Uso frecuente: Aplicar en el rostro como mascarilla facial dejando actuar 10 minutos y luego enjuagar.

¡Adaptá la rutina a tus gustos y necesidades! Esta es nuestra rutina completa de cuidado facial sugerida:
1. Limpiar el rostro (ej: jabón facial, agua micelar, etc)
2. Equilibrar el PH con un agua botánica (ej: agua de rosas)
3. Óleos (ej: CBD)
4. Sérum contorno de ojos
5. Sérum facial
6. Crema facial
7. Protector solar

Ingredientes: Rosa Canina Fruit Oil, Prunus Amygdalus (sweet almond) Oi, Cannabidiol, Tocopheryl acetate, Melisa Officinalis leaf Oil, Geraniol, Linalool, Hydroci-tronellal, Citral, Coumarin.

Envase de vidrio reutilizable de 15ml. Caja reciclable. Packaging compostable y biodegradable.
Producto inscripto en ANMAT.', 'SENTIDA BOTANICA', 25000, '5830755b-43b1-4ef9-93aa-aa337a263bfd', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820860312-fj9mt.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820860312-fj9mt.webp"]', '[]', 0, 0, 1, '2026-01-27T07:31:57.233226-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('a208509c-9d17-42c5-aa68-3439885cc8f3', 'Humidificador + Esencia Blanco', 'humidificador-esencia-blanco', NULL, 'Satibax', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448724755-4ivzi.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448724755-4ivzi.webp"]', '["kit-regalo","aroma"]', 0, 0, 1, '2026-06-02T20:05:48.360224-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('19dcc982-cb65-4ab6-8f77-715fa0130c7e', 'Jabón de cuerpo y manos cherry', 'jabon-de-cuerpo-y-manos-cherry', NULL, 'Tyl', 12500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675644297-t3ftu.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675644297-t3ftu.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675654372-x3hq3.webp"]', '[]', 0, 0, 1, '2026-06-05T11:09:01.955953-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7fde07f3-d946-4891-be8e-fb4767d42e54', 'Jabón Exfoliante - 100% Vegetal', 'jabon-exfoliante-100-vegetal', 'Presentación: Barra x 86 gr

Indicado: para todo tipo de piel. Formulado con cascarilla de nuez, arándanos, aceites de romero y regaliz, este jabón exfoliante limpia en profundidad eliminando la suciedad y células muertas. Experimenta una exfoliación intensa y efectiva, gracias a la abundante cascarilla de nuez, que deja la piel suave y renovada.


 


sin sulfatos –sin petrolatos –sin parabenos –sin dioxido de titanio - sin aditivos artificiales –sin colorantes –sin odoriferos



100% Vegetal – Vegano – Sin TACC


_________________________


 


INGREDIENTES: SODIUM PALMATE & SODIUM PALM KERNELATE & AQUA (WATER) & GLYCERIN & SODIUM CHLORIDE & SODIUM HYDROXIDE & TETRASODIUM EDTA & TETRASODIUM ETIDRONATE, ROMARINUS OFFICINALIS LEAF OIL (LINALOOL), JUNGLANS REGIA SHELL POWDER, GLYCYRRHIZA GLABRA LEAF EXTRACT, VACCINIUM MYRTILLUS FRUIT EXTRACT, EDTA, ETIDRONIC ACID, BHT.', 'Laima', 14500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820988341-o6iuo.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776820988341-o6iuo.webp"]', '[]', 0, 0, 1, '2026-01-19T14:53:20.269488-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b1a3d678-9dc1-4e41-8a09-c1c0e01a6f8d', 'Espuma Purifying – Limpieza Facial', 'espuma-purifying-limpieza-facial', 'Dermatológicamente testeada
Extracto de Caléndula • Extracto de Manzanilla


¿Qué hace?

Ofrece un efecto calmante, limpia en profundidad sin agredir, no deja sensación de tirantez y mantiene la hidratación natural de la piel. Aporta frescura, equilibra, revitaliza y descongestiona, aliviando incluso las pieles más sensibles. Su textura ligera elimina impurezas y exceso de oleosidad mientras preserva el equilibrio natural de la piel.


Apta para todo tipo de piel, incluso las más delicadas


MODO DE USO
Uso diario. Agitar antes de usar. Aplicar sobre la piel húmeda con movimientos circulares y enjuagar con abundante agua.



Hipoalergénico - Sin Gluten - Vegano - Sin Parabenos
Sin Petrolatos - Sin Alcohol
_________________________


INGREDIENTES: AQUA PURIFIED – DISODIUM COCOAMPHODIACETATE – MATRICARIA CHAMOMILLA EXTRACT – CALÉNDULA OFFICINALIS EXTRACT – BENZYL ALCOHOL (AND) BENZOIC ACID (AND) DEHYDROACETIC ACID (AND) TOCOPHEROL – FRAGRANCE.', 'Laima', 32000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821111076-7qwhr.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821111076-7qwhr.webp"]', '[]', 0, 0, 1, '2026-01-19T14:49:35.187789-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('bccd404c-008f-421e-a06c-f6b6742e8c60', 'Crema Revitalizing – Antiedad ', 'crema-revitalizing-antiedad', 'Dermatológicamente testeada
Bakuchiol • Ácido Hialurónico

¿Qué hace?
Deja la piel suave al instante, atenúa marcas de expresión y arrugas, restaura la elasticidad y mejora la firmeza mientras aporta un shock de hidratación inmediata.


Apta para todo tipo de piel, incluso las más delicadas
Crema facial para día y noche


Packaging sustentable:

Tapa de bambú natural y envase de vidrio reutilizable de diseño minimalista.


MODO DE USO
Uso diario. Aplicar sobre rostro y cuello limpios con suaves masajes deslizantes hasta su absorción.

 


Hipoalergénico - Sin Gluten - Vegano - Sin Parabenos
Sin Petrolatos - Sin Alcohol
_________________________


INGREDIENTES: AQUA PURIFIED – GLYCERIN – CETEARYL ALCOHOL + CETEARETH-20 – SIMMONDSIA CHINENSIS OIL – BAKUCHIOL – CAPRYLIC/CAPRIC TRIGLYCERIDE – DEHYDROXANTHAN GUM – ARGANIA SPINOSA KERNEL OIL – BENZYL ALCOHOL (AND) BENZOIC ACID (AND) DEHYDROACETIC ACID (AND) TOCOPHEROL – HYALURONIC ACID – FRAGRANCE.', 'Laima', 39000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821154863-7t0w1.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821154863-7t0w1.webp"]', '[]', 0, 0, 1, '2026-01-19T14:46:15.994384-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('ce0a2b6f-6b6a-4f03-8980-a7f2af7d3aaf', 'Contorno de Ojos Fusion Eye Care', 'contorno-de-ojos-fusion-eye-care', '¿Qué hace? 
Fusion Eye Care es un tratamiento avanzado diseñado para rejuvenecer la delicada piel del contorno de ojos. Su fórmula combina retinol, que estimula la renovación celular y suaviza líneas finas, con ácido hialurónico para hidratar intensamente. Además, la vitamina E protege contra los radicales libres y calma la piel. 

Este contorno de ojos ayuda a reducir visiblemente las ojeras oscuras, minimiza las bolsas y mejora la firmeza y elasticidad de la zona ocular. Ideal para quienes buscan un cuidado efectivo y especializado para esta delicada area. 

Fórmula aprobada dermatológicamente. 

Modo de uso: 
• Aplica una pequeña cantidad en la zona del contorno de ojos, después de limpiar el rostro. 
• Masajea muy suavemente con movimientos circulares para favorecer la absorción. 
• Se recomienda usar por la noche para obtener mejores resultados. 

Beneficios: 
• Reduce la apariencia de ojeras oscuras y bolsas. 
• Hidrata profundamente la piel del contorno de ojos. 
• Minimiza líneas finas y arrugas. 
• Protege la piel delicada contra el daño ambiental. 
• Mejora la firmeza y elasticidad. 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free 
Libre de Parabenos - Sin Alcohol 

_________________________ 
 

INGREDIENTES: WATER, CAPRYLIC/CAPRIC, TRIGLYCERIDE, GLYCERIN, CETEARYL ALCOHOL (AND) CETEARETH-20, CYCLOPENTASILOXANE, ISOPROPYL MYRISTATE, CETEARYL ALCOHOL (AND) SODIUM CETEARYL SULFATE, TOCOPHERYL ACETATE, PHENOXYETHANOL (AND) ETHYLHEXYLGLYCERIN, POLYSORBATE 80, TRIETHANOLAMINE, CARBOMER, BENZOPHENONE-3, BHT, ALCOHOL (AND), PROPYLENE GLYCOL (AND) SODIUM HYALURONATE (AND) PHOSPHOLIPIDS (AND) XANTHAN GUM (AND) SODIUM BENZOATE (AND) POTASSIUM SORBATE (AND) CITRIC ACID, DISODIUM EDTA, RETINOL (AND) POLYSORBATE 20 (AND) BHA.
', 'Laima', 35000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821297659-4vh9g.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821297659-4vh9g.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821303042-707q4.webp"]', '[]', 0, 0, 1, '2026-01-19T14:40:57.890539-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('83b46c3b-b771-4a22-8ef5-f94479ebc323', 'Serum Facial Glow con Niacinamida al 10%', 'serum-facial-glow-con-niacinamida-al-10', '¿Qué hace? 
Este serum combina un 10% de niacinamida con extracto de frutos rojos para ofrecer una solución completa que combate granos, reduce manchas y previene futuros brotes. 

La niacinamida regula la producción de sebo, limpia los poros y mejora la textura de la piel, mientras que los frutos rojos, ricos en antioxidantes, protege contra el daño ambiental y potencia la luminosidad de la piel. 

Unifica el tono, disminuye la hiperpigmentación y aporta un brillo natural, convirtiéndose en un paso esencial para quienes buscan resultados visibles con un cuidado intensivo. 

Fórmula aprobada dermatológicamente 
 

Modo de uso: 
• Aplica una pequeña cantidad sobre la piel limpia. 
• Masajea suavemente hasta su completa absorción, evitando el área de los ojos. 
• Úsalo por la mañana y por la noche para obtener resultados óptimos. 

Beneficios: 
• Combate granos y futuros brotes regulando el exceso de sebo. 
• Reduce manchas y corrige la hiperpigmentación. 
• Mantiene los poros limpios, mejorando la textura de la piel. 
• Aporta luminosidad inmediata y unifica el tono. 
• Protege contra el daño ambiental gracias a su fórmula antioxidante. 

Hipoalergénico - Sin Gluten - Vegano - Cruelty Free 
Libre de Parabenos - Sin Alcohol 

_________________________ 
 

INGREDIENTES: WATER, NICOTINAMIDE, GLYCERIN, SOLANUM NIGRUM EXTRACT (AND) RUBUS IDAEUS FRUIT EXTRACT (AND) VACCINIUM MYRTILLUS FRUIT EXTRACT, HYDROXYETHYLCELLULOSE, PHENOXYE-THANOL (AND) ETHYLHEXYLGLYCERIN, DISODIUMEDTA, LACTID ACID, CI 17200, FRAGANCE. ', 'Laima', 32000, '61f5cfdd-8cdd-4c34-88db-060efef554a7', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821350661-40jv5.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821350661-40jv5.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776821357941-i8048.webp"]', '[]', 0, 0, 1, '2026-01-19T14:38:07.963985-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('03cddf3e-95f3-4a1e-9fb4-ba887c8567d6', 'Crema Corporal NUTRICIÓN EXTRA - LOTO & MAGNOLIA', 'crema-corporal-nutricion-extra-loto-magnolia', 'Línea Corporal
Crema Corporal Nutrición Extra Loto & Magnolia


Ideal para incorporar un plus de nutrición en caso de piel seca, extra seca o simplemente para realizar un cuidado intenso.
La Manteca de Mango y el Aceite de Macadamia aportan todas sus propiedades para potenciar la elasticidad y tonificación de la piel. Brinda nutrición y suavidad. De fácil absorción, deja la piel tersa y perfumada.
Presentacion única bifloral de Loto & Magnolia.


Cremas que nutren nuestra piel y nuestra esencia natural. Inspirada en las texturas y aromas que la tierra nos ofrece, generando una experiencia sensorial única.
Cada variedad es una porción de naturaleza especialmente diseñada para cuidar tu piel, manteniendo la conexión natural con nuestro planeta.
Para una piel naturalmente Sentida.


INGREDIENTES: WATER, MACADAMIA OIL, MAGNIFERA SEED BUTTER, CETEARYL OLVATE AND SORBITAN OLIVATE, ABYSSINAN OIL CETYL. ALCOHOL, GLIYCERIN, FRAGANCE, TOCOPHEROL ACETATE, SODIUM BENZOATE AND POTASSIUM SORBATE, PANTHENOL, CITRIC ACID, BENZYL SALICYLATE, LIMONENE, LINALOOL, AMYL CiNNAMAL, BUTYLPHENYL METHYLPROPIONAL, CITRALONT. Producto aprobado por ANMAT. Sin TACC. Biodegradable. Vegano. Cruelty Free. Libre de químicos, sulfatos y parabenos. Sin aceite de palma.

Envase de vidrio reutilizable con válvula dosificadora de 250ml', 'SB', 28000, '5830755b-43b1-4ef9-93aa-aa337a263bfd', 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818403539-sn2ot.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1776818403539-sn2ot.webp"]', '[]', 0, 0, 1, '2026-01-27T13:07:56.393012-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7c6c0ddc-3f75-411f-b9c3-5133623ccfd3', 'Crema Corporal de Coco – Hidratación profunda y natural para tu piel', 'crema-corporal-de-coco-hidratacion-profunda-y-natural-para-tu-piel', 'Crema corporal de coco – Hidratación profunda y natural para tu piel

Disfrutá de la suavidad y nutrición de nuestra crema corporal  de coco, formulada con ingredientes 100% naturales que hidratan intensamente y protegen la piel seca y sensible. Su fórmula rica en aceite de coco aporta una sensación de frescura y bienestar, dejando tu piel suave, flexible y delicadamente perfumada.

Ideal para el cuidado diario, esta crema corporal es vegana, cruelty free y libre de parabenos y petrolatos, cuidando tu piel y el medio ambiente.

', 'Satibax', 28500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331392197-3gnkq.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331392197-3gnkq.webp"]', '[]', 0, 0, 1, '2026-06-01T11:36:02.914209-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('99c5599f-50fd-4932-94b5-1afd266f1746', 'Crema Corporal Humectante de Gardenia – Hidratación Profunda', 'crema-corporal-humectante-de-gardenia-hidratacion-profunda', 'Tu piel se siente seca, áspera o sin brillo?
Conocé nuestra crema corporal humectante de Gardenia, una fórmula ultra nutritiva diseñada para restaurar y embellecer tu piel desde la primera aplicación.', 'Satibax', 28500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331829953-zuxyf.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331829953-zuxyf.webp"]', '[]', 0, 0, 1, '2026-06-01T11:37:31.966308-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('78599b38-5d71-4029-8a54-bd69a66a17c2', 'Crema Corporal Nutritiva de Castañas & Oliva – Natural', 'crema-corporal-nutritiva-de-castanas-oliva-natural', '¿Piel seca y áspera? Probá nuestra crema corporal nutritiva de castañas, diseñada para brindar una hidratación profunda y prolongada. Enriquecida con manteca de karité y vitamina E, esta fórmula única mejora la elasticidad de la piel y combate la resequedad desde la primera aplicación.

Contiene extracto de oliva🫒, conocido por sus propiedades antioxidantes, antiinflamatorias y regenerativas que ayudan a calmar la piel, reducir moretones y restaurar su vitalidad. A su vez, la caléndula aporta suavidad y reparación, dejando tu piel sedosa, rejuvenecida y con un aroma cálido a castañas.

Ideal como crema para masajes o uso diario en manos y cuerpo. Su textura rica y de rápida absorción transforma tu rutina de cuidado en un momento de bienestar.

', 'Satibax', 28500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331878693-ab0yg.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331878693-ab0yg.webp"]', '[]', 0, 0, 1, '2026-06-01T11:38:17.518691-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7ca2041b-ebfe-47a5-8a90-6464bc6703a1', 'Crema Corporal Hidratante de Papaya – Hidratación Profunda con Aroma Dulce Tropical', 'crema-corporal-hidratante-de-papaya-hidratacion-profunda-con-aroma-dulce-tropical', '¿Piel opaca, reseca o sin vida? Descubrí el poder tropical de nuestra Crema Corporal Hidratante de Papaya 300ml, ideal para hidratar profundamente y dejar tu piel suave, luminosa y con un irresistible aroma dulce y frutal.

Formulada con una fusión de ingredientes naturales, esta crema es perfecta como crema hidratante diaria, para masajes o incluso para el cuidado post-tatuajes. Su textura suave y rápida absorción convierte cada aplicación en una experiencia sensorial.

Ideal para todo tipo de pieles, incluyendo las más sensibles. Aplicala sobre la piel limpia, masajeando hasta su total absorción. Usala después de la ducha para potenciar su efecto hidratante y sentir tu piel renovada todo el día.', 'Satibax', 28500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331919305-ztte4.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780331919305-ztte4.webp"]', '[]', 0, 0, 1, '2026-06-01T11:40:37.715331-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('4315a31d-c72f-4a15-8d81-88d331c974be', 'Humidificador + Esencia efecto madera', 'humidificador-esencia-efecto-madera', NULL, 'Satibax', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448949422-5x9mx.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448949422-5x9mx.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448951608-loebm.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780448953471-gqi55.webp"]', '["kit-regalo","aroma"]', 0, 0, 1, '2026-06-02T20:09:29.372154-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('c2ce163c-5822-4f07-a4fc-1341a5198d62', 'Duo Cherry Love', 'duo-cherry-love', '🍒✨ Dúo Cherry Love ✨🍒
El combo perfecto para mimar tu piel.
Incluye: ✔ Jabón para manos y cuerpo Cherry Love ✔ Crema bifásica Cherry Love
Una experiencia dulce, suave y perfumada de pies a cabeza.', 'Satibax', 24900, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675892199-k8kqo.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780675892199-k8kqo.webp"]', '[]', 0, 0, 1, '2026-06-05T11:12:02.891929-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('b0543149-df26-4c85-ba41-624b6c79bca6', 'Dúo de Bálsamos Labiales con Color Malbec y Cherry Black – Hidratación Premium y Radiante', 'duo-de-balsamos-labiales-con-color-malbec-y-cherry-black-hidratacion-premium-y-radiante', 'Descubrí el Dúo de Bálsamos labiales  con Color Malbec y Cherry Black, ideal para quienes buscan labios hidratados, suaves y con un toque de color natural. Estos bálsamos están formulados con ingredientes de origen vegetal que nutren intensamente, aportando brillo y color sin resecar.

El tono Malbec aporta un acabado vino intenso y elegante, mientras que Cherry Black deja un toque ciruela profundo, perfecto para destacar tu look. Gracias a su fórmula vegana y libre de parabenos, son aptos para pieles sensibles.

Usalos juntos o por separado para crear combinaciones únicas, ¡y llevá siempre en tu cartera un bálsamo!
Elegí una opción natural, efectiva y premium, pensada para realzar tu belleza sin descuidar tu piel.

Probá este dúo y enamorate de una experiencia de hidratación con color que realmente funciona.', 'PURASOAP', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841487009-393zt.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841487009-393zt.webp"]', '["natural","vegano"]', 1, 0, 1, '2026-06-07T09:12:57.95911-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('0605d0f9-6eec-46c2-a77f-9356203c9e69', 'Dúo Equilibrio con Aceite Palo Santo y Cítrico – Energía Renovada y Armonía Diaria', 'aromaterapia-de-bienestar-eucalipto-purificante-palo-santo-protector-magico', 'Sentís que necesitás reenfocarte, levantar el ánimo o equilibrar tus emociones?
El Dúo Equilibrio con Palo Santo y notas cítricas es una combinación pensada para revitalizar cuerpo y mente a través del poder de la aromaterapia natural. 🌿🍋

Spray Cítrico -Alegra: 
Una mezcla vibrante de aceites esenciales cítricos (como naranja, limón y bergamota) que estimulan los sentidos, elevan el estado de ánimo y limpian energéticamente los espacios. Ideal para comenzar el día con claridad y buena vibra.

Spray Palo Santo & Mirra:
El toque sagrado que aporta conexión, protección y equilibrio. El palo santo es perfecto para anclarte en el presente, limpiar energías densas y potenciar tu enfoque

', 'PURASOAP', 38000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841719179-lsw2r.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841719179-lsw2r.webp"]', '["natural","vegano","aroma","kit-regalo"]', 0, 0, 1, '2026-06-07T09:16:19.107289-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('73a48db4-107f-4593-b5cb-fe4e77dc4d19', 'Aromaterapia de Bienestar – Eucalipto Purificante + Palo Santo Protector Mágico1', 'aromaterapia-de-bienestar-eucalipto-purificante-palo-santo-protector-magico1', '¿Te sentís congestionado, estresado o con baja energía? Descubrí el equilibrio perfecto entre alivio y armonía con nuestro Spray Aromático Bienestar, una poderosa fusión de aceites esenciales de Eucalipto y Palo Santo, pensada para renovar cuerpo, mente y ambiente.

💨 Respirá libertad: El aceite esencial de eucalipto combinado con menta, mentol y alcanfor alivia la congestión nasal, relaja vías respiratorias y refresca el ambiente. Ideal para épocas de alergias, resfríos o simplemente para purificar el aire.

🌿 Elevá tu vibración: El poder espiritual del Palo Santo y la mirra te ayuda a limpiar energías negativas, atraer abundancia y crear espacios llenos de paz, ideal para meditación, descanso o rituales de armonización.

', 'PURASOAP', 38000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841851115-euknh.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841851115-euknh.webp"]', '["natural","vegano","aroma","kit-regalo"]', 0, 1, 1, '2026-06-07T09:18:42.212611-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('3797e92d-179d-424a-9341-3fd8dcd472e7', 'Protector Solar con Color Medio1 FPS 60 + Activo de Acido Hialuronico', 'protector-solar-con-color-medio1-fps-60-activo-de-acido-hialuronico', 'Protegé tu piel todos los días con nuestro  Protector Solar Facial FPS60 con Color BRONZE, un fluido liviano con acabado natural que se adapta perfectamente a tu tono, unifica el color y disimula imperfecciones. Ideal para quienes buscan un protector solar con color, efecto glow y antiage, sin dejar textura seca ni efecto graso, evitando que se marquen las líneas de expresión.

Edad recomendada: Pre-adolecentes

Protege contra rayos UVA y UVB. De acción ultra-hidratante por su fórmula enriquecida con Ectoína (protector activo que actúa sobre los signos del envejecimiento cutáneo) y extractos de células vivas de levaduras, aloe vera, y manteca de karité.', 'PURASOAP', 37500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842096492-jg1kj.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842096492-jg1kj.webp"]', '["natural","vegano","facial"]', 0, 1, 1, '2026-06-07T09:22:22.653746-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('fa77f870-f154-4c56-9af0-77dd9434ea48', 'Desodorante Lemongrass & Cedro en barra', 'desodorante-lemongrass-cedro-en-barra', '¡Daori es el primer desodorante de magnesio del país! 

Lanzamos un novedoso + hermoso envase de cartón biodegradable :)

Nuestra fórmula innovadora utiliza magnesio, un mineral que neutraliza el medio ácido en el que crecen las bacterias que causan mal olor, pero sin obstruir las glándulas sudoríparas ni los poros de la piel. Regula el olor de la transpiración pero permitiendo su función fisiológica. No mancha la ropa ni la piel.

Todos nuestros productos son aptos para veganos, y no han sido testeados en animales. Aprobados por ANMAT.

sin aluminio
sin alcohol
sin parabenos
Aroma de lemongrass + cedro, proveniente de aceites esenciales puros :)

INCI: Cocos nucifera (coconut) Oil, Magnesium Hydroxide, Euphorbia cerífera (candelilla) wax, Prunus Amygdalus (sweet almond) Oil, Shea Butter (Butyruspermum Parkii), Caprylic/Capric Triglyceride, Theobroma Cacao Seed Butter, Zinc Oxide, Copernicia Cerifera (carnauba) wax, Silica, Tocopheryl acetate. May contain fragrance (citral, linalool, geraniol, citronellol, d-limonene, eugenol). ', 'DAORI', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842332423-9fr0d.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842332423-9fr0d.webp"]', '["vegano","natural"]', 1, 0, 1, '2026-06-07T09:26:29.519215-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('ac53b745-10c1-491e-8ada-fa3c1206b52b', 'Desodorante Neutro - sin aroma en barra', 'desodorante-neutro-sin-aroma-en-barra', '¡Daori es el primer desodorante de magnesio del país! 

Lanzamos un novedoso + hermoso envase de cartón biodegradable :)

Nuestra fórmula innovadora utiliza magnesio, un mineral que neutraliza el medio ácido en el que crecen las bacterias que causan mal olor, pero sin obstruir las glándulas sudoríparas ni los poros de la piel. Regula el olor de la transpiración pero permitiendo su función fisiológica. No mancha la ropa ni la piel.

Todos nuestros productos son aptos para veganos, y no han sido testeados en animales. Aprobados por ANMAT.

sin aluminio
sin alcohol
sin parabenos
Esta opción es neutra - sin aroma, ¡ideal para pieles sensibles!

INCI: Cocos nucifera (coconut) Oil, Magnesium Hydroxide, Euphorbia cerífera (candelilla) wax, Prunus Amygdalus (sweet almond) Oil, Shea Butter (Butyruspermum Parkii), Caprylic/Capric Triglyceride, Theobroma Cacao Seed Butter, Zinc Oxide, Copernicia Cerifera (carnauba) wax, Silica, Tocopheryl acetate.', 'Satibax', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842408428-kfzdc.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842408428-kfzdc.webp"]', '["natural","vegano"]', 1, 0, 1, '2026-06-07T09:25:14.98259-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('678b17ed-f031-4d16-9574-e893788b34f3', 'Exfoliante Corporal Peach Blossom · Vgreen · 200 g', '32r2', 'Exfoliante Corporal Peach Blossom · Vgreen · 200 g

Una caricia frutal para tu piel.

El Exfoliante Corporal Peach Blossom de Vgreen ayuda a suavizar, renovar y revitalizar la piel gracias a su acción exfoliante, eliminando impurezas y células muertas para revelar una piel más luminosa y sedosa.

Su delicado aroma a durazno y flores transforma la rutina de cuidado corporal en un momento de disfrute, dejando una sensación de frescura, suavidad y bienestar.

🍑✨ Beneficios principales
• Exfolia suavemente la piel.
• Ayuda a eliminar células muertas e impurezas.
• Favorece una textura más lisa y uniforme.
• Deja la piel suave, luminosa y renovada.
• Ideal para incorporar en tu rutina semanal de cuidado corporal.

🌸 Aroma delicado y envolvente
La combinación de notas frutales y florales aporta una experiencia sensorial fresca, dulce y armoniosa que permanece en la piel después de cada uso.

💚 Belleza consciente
• Apto para veganos.
• Libre de ingredientes de origen animal.
• Elaborado bajo criterios de cuidado responsable.

🛁 Modo de uso
Aplicar sobre la piel húmeda realizando suaves movimientos circulares. Enjuagar con abundante agua y continuar con tu crema corporal favorita para potenciar la hidratación.

✨ Una piel renovada, suave al tacto y naturalmente radiante desde la primera aplicación.

Un ritual de cuidado que florece sobre tu piel.', 'Vgreen', 20000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842746010-2ojf1.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842746010-2ojf1.webp"]', '["vegano","natural"]', 0, 0, 1, '2026-06-07T09:32:31.466336-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('49024345-9f48-4052-a98e-4f012d4dde0a', 'Hisopos SIN PLASTICO', 'adf', 'Hisopos de Bambú MERAKI · 100 unidades

Una alternativa simple y consciente para tu rutina diaria.

Los hisopos de bambú MERAKI están elaborados con mango de bambú y puntas de algodón, ofreciendo una opción más sustentable frente a los hisopos plásticos tradicionales. Son biodegradables, compostables y aptos para quienes buscan reducir su impacto ambiental sin resignar practicidad.

🌿 Características
• 100 unidades por envase.
• Mango elaborado con bambú.
• Puntas suaves de algodón.
• Producto vegano.
• Biodegradable.
• Compostable.

💚 Una elección más responsable
Pequeños cambios generan grandes impactos. Al elegir productos elaborados con materiales renovables y biodegradables, contribuís a reducir el uso de plásticos de un solo uso en tu día a día.

✨ Uso recomendado
Ideales para distintas tareas de higiene y cuidado personal. En caso de utilizarlos para la limpieza de las orejas, se recomienda limpiar únicamente la parte externa del oído.

🌎 Un gesto simple para vos, una diferencia positiva para el planeta.', 'Meraki', 3800, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842682160-rgzzd.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842682160-rgzzd.webp"]', '["vegano","natural"]', 1, 0, 1, '2026-06-07T09:31:28.557856-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('0ce619e2-a90e-494b-9ef1-3690f66bb22e', 'Desodorante Lavanda & Salvia en barra', 'desodorante-lavanda-salvia-en-barra', '¡Daori es el primer desodorante de magnesio del país!

Lanzamos un novedoso + hermoso envase de cartón biodegradable :)

Nuestra fórmula innovadora utiliza magnesio, un mineral que neutraliza el medio ácido en el que crecen las bacterias que causan mal olor, pero sin obstruir las glándulas sudoríparas ni los poros de la piel. Regula el olor de la transpiración pero permitiendo su función fisiológica. No mancha la ropa ni la piel.

Todos nuestros productos son aptos para veganos, y no han sido testeados en animales. Aprobados por ANMAT.

sin aluminio
sin alcohol
sin parabenos
Aroma de lavanda + salvia, proveniente de aceites esenciales puros :)

INCI: Cocos nucifera (coconut) Oil, Magnesium Hydroxide, Euphorbia cerífera (candelilla) wax, Prunus Amygdalus (sweet almond) Oil, Shea Butter (Butyruspermum Parkii), Caprylic/Capric Triglyceride, Theobroma Cacao Seed Butter, Zinc Oxide, Copernicia Cerifera (carnauba) wax, Silica, Tocopheryl acetate. May contain fragrance (citral, linalool, geraniol, citronellol, d-limonene, eugenol).', 'Satibax', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842420814-7f3y8.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842420814-7f3y8.webp"]', '["vegano","natural"]', 0, 1, 1, '2026-06-07T09:27:37.815994-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('7c402c25-4492-4008-96ed-95fd3a8da386', 'ADORÉ Eau de Parfum · 15 ml', 'vvv', 'ADORÉ Eau de Parfum · 15 ml

Una fragancia delicada y luminosa que celebra la elegancia natural, la sensibilidad y la esencia femenina.

ADORÉ combina frescura floral y sofisticación en un perfume pensado para acompañarte todos los días. Su práctico formato de 15 ml es ideal para llevar en la cartera, tener siempre a mano y reaplicar cuando quieras sentirte especial.

✨ Notas destacadas
• Jazmín
• Rosa damascena
• Peonía

Su aroma floral fresco y radiante aporta una sensación de armonía, suavidad y confianza, perfecta para quienes buscan una fragancia femenina, versátil y encantadora.

🌿 Formato práctico
Ideal para el uso diario, viajes o para llevar contigo a donde vayas.

💚 Elegí belleza consciente
En Satibax Boutique seleccionamos productos que acompañan el bienestar personal y el respeto por el entorno. ADORÉ es una fragancia creada para quienes valoran la elegancia, la frescura y el cuidado en cada elección.

Un perfume para enamorarte desde la primera aplicación.', 'Vgreen', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842547956-pjchy.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842547956-pjchy.webp"]', '["vegano","natural","aroma"]', 1, 0, 1, '2026-06-07T09:29:27.233873-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('4db1dcee-914a-4371-af8d-7f1438896ffb', 'CHEIROSA Eau de Parfum · 15 ml', 'vvvds', 'CHEIROSA Eau de Parfum · 15 ml

Una fragancia cálida, alegre y envolvente que captura la energía vibrante de Brasil en cada gota.

CHEIROSA está inspirada en la frescura de los días soleados, los atardeceres dorados y esa sensación de felicidad que invita a disfrutar el presente. Su aroma dulce y tropical deja una estela irresistible que acompaña durante todo el día.

✨ Notas destacadas
• Bergamota
• Praliné
• Almizcle
• Tonka

La combinación de notas cítricas, gourmand y sensuales crea una fragancia femenina, luminosa y adictiva, perfecta para quienes aman los perfumes dulces con personalidad.

🌴 Un viaje sensorial
CHEIROSA transmite la calidez, la alegría y el espíritu relajado de los trópicos, envolviéndote en un aroma que invita a sonreír y disfrutar cada momento.

👜 Formato práctico
Su presentación de 15 ml es ideal para llevar en la cartera, el bolso o de viaje, para que tu fragancia favorita te acompañe a todas partes.

💚 Belleza consciente
En Satibax Boutique elegimos productos que promueven el bienestar y el cuidado responsable. Una fragancia pensada para disfrutar con armonía y conciencia.

Un perfume dulce, radiante y lleno de vida que te hará sentir única desde la primera aplicación.', 'Satibax', 21500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842577314-o8lr8.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842577314-o8lr8.webp"]', '["vegano","natural","aroma"]', 1, 0, 1, '2026-06-07T09:30:00.757936-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('c6a90e43-b8f7-4b53-9155-549c387c81ff', 'Bálsamos chocolate y ciruela', 'descubri-el-duo-irresistible-de-balsamos-labiales-con-color-cherry-y-cherry-black-disenados-para-brindar-una-hidratacion-sublime-y-un-color-vibrante-que-dura-todo-el-dia-estos-balsamos-premium-estan-formulados-con-ingredientes-naturales-y-veganos-que-nutren-profundamente-tus-labios-dejandolos-suaves-protegidos-y-con-un-brillo-radiante-el-tono-cherry-aporta-un-color-fresco-y-dulce-mientras-que-cherry-black-ofrece-un-acabado-elegante-y-sofisticado-con-un-toque-ciruela-intenso-perfectos-para-usar-juntos-o-por-separado-estos-balsamos-combinan-estilo-y-cuidado-en-un-solo-pack-sin-parabenos-ni-crueldad-animal-este-duo-es-ideal-para-pieles-sensibles-y-para-quienes-buscan-un-cuidado-labial-consciente-y-efectivo-eleva-tu-rutina-de-belleza-con-este-duo-de-balsamos-que-protege-hidrata-y-embellece', 'Descubrí el dúo irresistible de bálsamos labiales con Color Nude | Chocolate y malbec | Uva , diseñados para brindar una hidratación sublime y un color vibrante que dura todo el día. Estos bálsamos premium están formulados con ingredientes naturales y veganos que nutren profundamente tus labios, dejándolos suaves, protegidos y con un brillo radiante.

Sin parabenos ni crueldad animal, este dúo es ideal para pieles sensibles y para quienes buscan un cuidado labial consciente y efectivo. Elevá tu rutina de belleza con este dúo de bálsamos que protege, hidrata y embellece.

', 'PURASOAP', 25000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841644403-7w7wl.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780841644403-7w7wl.webp"]', '["natural","vegano"]', 0, 0, 1, '2026-06-07T09:14:31.259936-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('e3bb1b8a-10b4-434f-8c5c-9edd10c4ad77', 'Dentrifico comprimido SIN FLUOR x62 u', 'aavdsv', 'Bits MERAKI · Dentífrico Natural en Comprimidos

Una forma práctica, sustentable e innovadora de cuidar tu sonrisa.

Los Bits MERAKI son comprimidos dentales diseñados para reemplazar la pasta dental tradicional, ayudándote a reducir residuos y simplificar tu rutina de higiene bucal sin resignar frescura ni efectividad.

🌿 ¿Cómo se usan?

1. Colocá un Bit en tu boca.
2. Mordelo suavemente hasta deshacerlo.
3. Cepillate con el cepillo húmedo.
4. Enjuagá y disfrutá una sensación de limpieza y frescura duradera.

✨ Beneficios
• 62 comprimidos por envase (equivalente a 62 cepillados).
• Elaborados con ingredientes de origen natural.
• Sin conservantes.
• Libres de flúor.
• Sabor fresco a menta.
• Fórmula vegana.
• Sin TACC.
• Cruelty free.

💚 Una elección consciente
Además de cuidar tu salud bucal, los Bits MERAKI ayudan a reducir el uso de envases plásticos y promueven hábitos más amigables con el medio ambiente.

Ideal para quienes buscan practicidad, innovación y bienestar en cada detalle de su rutina diaria.

🦷 Sonrisa fresca, cuidado natural y menos impacto ambiental en un solo producto.', 'Meraki', 8500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842645231-v1bew.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842645231-v1bew.webp","https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842651425-red98.webp"]', '["vegano","natural","celiacosafe"]', 1, 0, 1, '2026-06-07T09:31:07.40454-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('01774a48-ef59-4d4a-952e-1dc683a00259', 'Hilo Dental x30 mts', 'qwera', 'Hilo Dental MERAKI · Menta · 30 metros

Complementá tu rutina de higiene bucal con una opción práctica, efectiva y más amigable con el planeta.

El Hilo Dental MERAKI ayuda a eliminar restos de comida y placa bacteriana en espacios donde el cepillo no siempre llega, contribuyendo al cuidado diario de dientes y encías.

🌿 Características
• 30 metros de hilo dental.
• Sabor refrescante a menta.
• Acción antiplaca.
• Encerado con ingredientes de origen natural.
• Producto vegano.
• Biodegradable.

✨ Limpieza profunda y frescura
Su textura permite deslizarse cómodamente entre los dientes para una limpieza eficaz, ayudando a mantener una boca más limpia y una sensación de frescura duradera.

💚 Cuidado consciente
Diseñado para quienes buscan incorporar hábitos de higiene más responsables, combinando bienestar personal y compromiso con el cuidado ambiental.

🦷 Ideal para el uso diario
El complemento perfecto para una rutina de higiene bucal completa, ayudando a cuidar tu sonrisa de forma simple y natural.

Una sonrisa saludable comienza en los pequeños hábitos de todos los días.', 'Meraki', 6800, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842698172-v2jvy.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842698172-v2jvy.webp"]', '["vegano","natural"]', 1, 0, 1, '2026-06-07T09:31:43.371734-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('ec05a183-00b3-44c0-801c-20ededf25bfe', 'Exfoliante Corporal de Frambuesa y Coco', '3r3', 'Exfoliante Corporal Coconut Berries · Vgreen · 200 ml

Renová tu piel con una experiencia de cuidado natural que combina suavidad, frescura y nutrición.

El Exfoliante Corporal Coconut Berries de Vgreen ayuda a eliminar impurezas y células muertas, dejando la piel más suave, luminosa y revitalizada desde la primera aplicación. Su textura cremosa y su delicioso aroma convierten la rutina de cuidado corporal en un verdadero momento de bienestar.

🥥✨ Beneficios principales
• Exfoliación suave y efectiva.
• Ayuda a renovar la apariencia de la piel.
• Favorece una textura más lisa y uniforme.
• Deja la piel suave, fresca y luminosa.
• Ideal para incorporar en tu rutina semanal de cuidado corporal.

🌿 Ingredientes de origen natural
Enriquecido con partículas exfoliantes naturales de cáscara de nuez, que ayudan a remover suavemente las células muertas sin agredir la piel.

💚 Belleza consciente
• Apto para veganos.
• Sin gluten.
• Elaborado bajo criterios de cuidado responsable.

🛁 Modo de uso
Aplicar sobre la piel húmeda realizando suaves masajes circulares, especialmente en zonas que necesiten una exfoliación más profunda. Luego enjuagar con abundante agua.

✨ El resultado: una piel más suave, renovada y lista para absorber mejor tus cremas y tratamientos corporales.

Un ritual de cuidado que transforma tu rutina en un momento para vos.', 'Vgreen', 20000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842720198-s4l0g.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842720198-s4l0g.webp"]', '["vegano","natural","facial"]', 0, 0, 1, '2026-06-07T09:32:05.116932-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('0f3de472-cbdd-499d-b1fa-f93e737ecb87', 'Exfoliante Corporal de Vainilla Sugar', '32rw', 'Exfoliante Corporal Vainilla · Vgreen · 200 ml

Un mimo para la piel y los sentidos.

El Exfoliante Corporal de Vainilla de Vgreen ayuda a renovar la piel de forma suave y efectiva, eliminando impurezas y células muertas para revelar una piel más luminosa, sedosa y uniforme. Su exquisito aroma dulce y reconfortante transforma cada aplicación en un verdadero ritual de bienestar.

🤍✨ Beneficios principales
• Exfoliación suave y efectiva.
• Ayuda a renovar la apariencia de la piel.
• Favorece una textura más suave y uniforme.
• Deja la piel aterciopelada y luminosa.
• Ideal para complementar tu rutina de cuidado corporal.

🌿 Cuidado natural
Su fórmula contiene ingredientes seleccionados para brindar una exfoliación delicada, ayudando a mantener la piel fresca, suave y renovada.

💚 Belleza consciente
• Apto para veganos.
• Libre de ingredientes de origen animal.
• Elaborado bajo criterios de cuidado responsable.

🛁 Modo de uso
Aplicar sobre la piel húmeda con suaves movimientos circulares, insistiendo en codos, rodillas y otras zonas que requieran mayor exfoliación. Luego enjuagar con abundante agua.

✨ Después de cada uso, la piel se siente más suave, luminosa y preparada para absorber mejor cremas y tratamientos corporales.

Un aroma cálido y envolvente que convierte el cuidado diario en un pequeño momento de placer.', 'Vgreen', 20000, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842732063-hey7b.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842732063-hey7b.webp"]', '["natural","vegano"]', 0, 0, 1, '2026-06-07T09:32:18.879701-05:00');
INSERT OR REPLACE INTO products (id, name, slug, description, brand, price, category_id, image_url, images, tags, is_new, bestseller, active, created_at) VALUES ('22a2f988-d313-4d85-8483-7277a807ebb9', 'Desodorante a bolilla SIN ALUMINIO', 'eee', 'Desodorante Natural Romero · DABAR · Roll On

Protección efectiva y frescura natural para todos los días.

El Desodorante Natural de Romero DABAR está formulado para ayudar a neutralizar los olores de forma suave y respetuosa con la piel, sin bloquear los procesos naturales del cuerpo. Su delicado aroma herbal aporta una sensación de limpieza y bienestar durante toda la jornada.

🌿 Beneficios principales
• Libre de sales de aluminio.
• Ayuda a controlar los olores de forma natural.
• Aroma fresco y herbal a romero.
• Ideal para el uso diario.
• Apto para todo tipo de piel.

✨ El poder del romero
Reconocido por sus propiedades refrescantes y revitalizantes, el romero aporta una sensación de frescura duradera que acompaña tu rutina cotidiana.

💚 Cuidado consciente
• Fórmula de origen natural.
• Libre de aluminio.
• Cruelty free.
• Elaborado con respeto por tu piel y el medio ambiente.

🧴 Modo de uso
Aplicar sobre la piel limpia y seca de las axilas. Dejar secar unos instantes antes de vestir.

🌱 Una alternativa natural para quienes buscan sentirse frescos, cómodos y en armonía con su cuerpo.

Frescura natural, confianza auténtica.', 'Dabar', 16500, NULL, 'https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842768634-z8b6l.webp', '["https://yxsbrkromgnozprmyvla.supabase.co/storage/v1/object/public/productos/producto-1780842768634-z8b6l.webp"]', '["vegano","kit-regalo"]', 0, 1, 1, '2026-06-07T09:32:53.102417-05:00');

-- 3. Blog Posts
INSERT OR REPLACE INTO blog_posts (id, title, slug, excerpt, content, cover_image, published, created_at) VALUES ('83512987-c621-44b5-adfe-6fba997ecbcf', 'Hola, soy Elizabeth', 'hola-soy-elizabeth', 'Presentación de Elizabeth, fundadora de Satibax Boutique.', 'Y creo que si esta es la primera entrada del blog, corresponde empezar por ahí.
Soy Elizabeth, la persona detrás de Satibax Boutique.

Hace tiempo que tenía ganas de abrir este espacio porque me gusta escribir. Me gusta poner en palabras las cosas que pienso, las cosas que vivo y las preguntas que me hago.

Y si soy sincera, no sabía muy bien cuál tenía que ser el primer tema.

Pensé en hablar de la tienda, de los productos, de cómo empezó todo.

Pero al final me di cuenta de que antes de hablar de Satibax, tenía que hablar un poco de mí.

Porque Satibax no apareció de la nada.

Nació de una parte de mi historia. 

De momentos lindos y de momentos difíciles.

De decisiones acertadas y de otras que no tanto.

De búsquedas, de cambios y de esas etapas donde una siente que está perdida y no entiende muy bien para dónde va.

Durante mucho tiempo me enojé con algunas cosas que me pasaron.

Pensaba: "¿Por qué esto?", "¿Por qué ahora?", "¿Por qué de esta manera?".

Y con los años empecé a mirar esas mismas situaciones desde otro lugar.

No porque hayan dejado de doler o porque de repente se hayan vuelto maravillosas.

Sino porque entendí que muchas veces las cosas simplemente son.

No necesariamente buenas.
No necesariamente malas.

Son circunstancias.

Y después somos nosotros quienes decidimos qué hacemos con eso.

Si nos quedamos atrapados en el dolor o si intentamos encontrar algo que aprender en el camino.

No siempre se puede enseguida.

Hay procesos que llevan tiempo.

Hay tormentas que hay que atravesar antes de entender qué vinieron a enseñarnos.

Y creo que gran parte de mi vida, y también de Satibax, tiene que ver con eso.

Con aprender a atravesar.

Con seguir adelante aun cuando no tenemos todas las respuestas.

Con descubrir que a veces de los momentos más incómodos nacen las transformaciones más importantes.

Por eso quería que este primer post fuera simple.

Sin fórmulas.
Sin frases perfectas.

Solo una presentación.

Un "hola, esta soy yo".

Y una invitación a compartir este espacio donde seguramente vamos a hablar de naturaleza, bienestar, emprendimiento, emociones, aprendizajes y de todo aquello que nos ayude a vivir un poco más conscientes.

Gracias por estar acá.

Nos seguimos leyendo.

Elizabeth 🌿', NULL, 1, '2026-05-28T18:05:06.93732-05:00');
