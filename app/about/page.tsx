import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="max-w-[1200px] mx-auto">
          <Navbar />
          <section className="flex flex-col items-start justify-center gap-6 py-24 px-4 md:py-32 md:max-w-xl lg:py-48 lg:max-w-2xl text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              À propos de Sans Croquettes Fixes
            </h1>
            <p className="text-lg md:text-xl leading-relaxed drop-shadow-md">
              Une association dédiée à la protection animale et à la solidarité humaine.
            </p>
          </section>
        </div>
      </header>
      <main className="max-w-[1200px] mx-auto px-4 py-8 flex flex-col gap-12 text-[var(--color-quaternary)]">
        <section className="bg-[var(--color-tertiary)] p-8 rounded-lg shadow-md">
          <p className="text-base md:text-lg leading-relaxed">
            Chez Sans Croquettes Fixes, nous croyons que la protection animale
            passe aussi par la solidarité humaine. Derrière chaque animal en
            difficulté, il y a souvent un maître en détresse. C’est pourquoi nous
            accompagnons celles et ceux qui n’arrivent plus à subvenir aux besoins
            de leur compagnon, en leur apportant soutien, conseils et présence.
            Notre mission ne se limite pas à donner quelques croquettes ou faire
            une prise en charge, elle vise aussi à redonner espoir et à s’inscrire
            dans une vision long terme.
          </p>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Nos Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/img/icone-1.png" alt="Prise en charge" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Prise en charge</h3>
              <p className="text-center">
                Chats malades, âgés ou abandonnés : Sans Croquettes Fixes prend en
                charge ceux qui n’ont plus d’autre solution, pour leur offrir
                soins, sécurité et, parfois, une seconde chance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/img/icone-2.png" alt="Distribution" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Distribution</h3>
              <p className="text-center">
                Tous les vendredis à Lyon (69), nous proposons une distribution
                gratuite de croquettes pour aider les familles en difficulté à
                nourrir leurs animaux et éviter les abandons pour des raisons
                financières.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/img/icone-3.png" alt="Stérilisation" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Stérilisation</h3>
              <p className="text-center">
                Tout au long de l’année, nous menons des campagnes de
                stérilisation, notamment en partenariat avec les communes, pour
                limiter la prolifération des chats errants et améliorer leur
                qualité de vie.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/img/icone-4.png" alt="Accompagnement" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Accompagnement</h3>
              <p className="text-center">
                Nous accompagnons les particuliers confrontés à des difficultés
                avec leurs animaux en leur apportant écoute, conseils et solutions
                adaptées. L’objectif : éviter les abandons et ne recourir à une
                prise en charge qu’en dernier recours.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/img/icone-5.png" alt="Sensibilisation" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">Sensibilisation</h3>
              <p className="text-center">
                Nous participons régulièrement à des événements pour sensibiliser
                le public à la cause animale, au respect du vivant et au bien-être
                des animaux, quels qu’ils soient.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-secondary)] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">À Lyon, nous venons en aide aux humains et à leurs animaux.</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            Sans Croquettes Fixes est une association loi 1901 à but non lucratif,
            déclarée en préfecture depuis août 2015 (SIRET : 81819530700017).
            Basés à Lyon, nous agissons dans toute la région pour limiter les
            abandons en soutenant les propriétaires d’animaux en difficulté.
            Chaque vendredi, nous distribuons gratuitement de la nourriture pour
            les animaux des personnes en situation de précarité. Nous apportons
            également une solution aux chats sans solution, en les plaçant en
            familles d’accueil. Une fois qu’ils sont prêts, aussi bien
            physiquement que psychologiquement, nous les proposons à l’adoption.
            Pour le moment, nos prises en charge concernent uniquement les chats.
            Toutes nos actions sont bénévoles. Nous ne sommes ni un refuge, ni une
            entreprise, mais une équipe engagée pour le bien-être des humains et
            de leurs compagnons.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Aide alimentaire</h3>
              <p>Distribution gratuite de nourriture pour les animaux des personnes en situation de précarité, chaque semaine à Lyon.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Prises en charge et adoptions</h3>
              <p>Accompagnement de chats en détresse, placés en familles d’accueil puis proposés à l’adoption.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Prévention de l’abandon</h3>
              <p>Soutien concret aux maîtres en difficulté pour éviter les séparations forcées.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Derrière chaque sauvetage, une rencontre inoubliable.</h2>
          <p className="text-center text-lg mb-8">Vous avez changé leur vie.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <article className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/animals/mambo.jpg" alt="Mambo" className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mambo</h3>
              <p>Atteint d’une malformation très rare, Mambo a eu besoin d’importantes chirurgies que nous avons pu financer grâce à votre soutien.</p>
            </article>
            <article className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/animals/puppy.jpg" alt="Puppy" className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">Puppy</h3>
              <p>Trouvée à 500gr avec un prolapsus et deux fémurs cassés, aucune association n’a voulu tenter de la prendre en charge, mais grâce à vous, elle a pu être sauvée.</p>
            </article>
            <article className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/animals/kiki.jpg" alt="Kiki" className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">Kiki</h3>
              <p>Suite à l’hospitalisation longue durée de son humain, Kiki s’est retrouvé sans solution. Nous l’avons récupéré et placé en famille d’accueil.</p>
            </article>
            <article className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src="/assets/animals/pepinette.jpg" alt="Pépinette" className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-lg font-semibold mb-2">Pépinette</h3>
              <p>Après un long traitement PIF, Pépinette est enfin en rémission et s’adapte peu à peu à la vie en famille.</p>
            </article>
          </div>
        </section>

        <section className="bg-[var(--color-tertiary)] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Les débuts de Sans Croquettes Fixes</h2>
          <p className="text-base md:text-lg leading-relaxed">
            L’idée de Sans Croquettes Fixes est née en 2015, à la suite d’une
            discussion avec des associations menant des maraudes auprès des
            sans-abris. Une question s’est imposée : qui prend soin des animaux
            des personnes à la rue ? La réponse étant “personne”, Hélène et Anaïs
            ont décidé d’agir. Les premières actions ont été menées aux côtés de
            l’association La Main Tendue. Grâce à la générosité de vétérinaires,
            de particuliers et d’enseignes locales, nous avons pu distribuer de la
            nourriture et créer un lien de confiance avec les maîtres comme avec
            leurs animaux. Au fil des années, nos actions se sont élargies. La
            distribution hebdomadaire de croquettes à Lyon reste au cœur de notre
            mission, mais la prise en charge de chats en difficulté a pris une
            place grandissante. Depuis nos débuts, nous avons toujours fait le
            choix de garder une dimension profondément humaine. Derrière un animal
            en souffrance, il y a souvent une personne en détresse. Notre rôle est
            d’aider les deux, avec bienveillance, écoute et respect.
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Parce que l'abandon ne devrait jamais être une solution</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">C’est autour de cette conviction que Sans Croquettes Fixes est née. Au départ, c’était quelques mains tendues pour distribuer gratuitement de la nourriture aux animaux des sans-abri. Et puis, au fil des années, l’association est devenue un refuge au sens large : un lieu sûr pour les animaux qui n’avaient plus nulle part où aller, et un soutien pour ceux qui, malgré les difficultés, refusent de baisser les bras.</p>
          <img src="/assets/img/signature.png" alt="Signature Anaïs Hillion" className="mx-auto mb-4" />
          <p className="text-lg font-semibold">Anaïs Hillion, co-fondatrice de Sans Croquettes Fixes</p>
        </section>

        <section className="bg-[var(--color-primary)] text-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-4">Vous avez besoin d'aide ?</h3>
          <p className="text-lg mb-4">Vous faites face à une situation compliquée et vous avez besoin d’un coup de main pour prendre soin de vos animaux ? Vous êtes témoin d’une situation d’urgence pour un animal en danger ?</p>
          <a href="/contact" className="bg-white text-[var(--color-primary)] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">Contactez-nous</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
