"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import HeadingSecondary from "@/components/ui/HeadingSecondary";

export default function LegalNotice() {
  const sectionBaseClass =
    "flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto text-base sm:text-lg md:text-xl leading-8 md:leading-10";
  const sectionBorderedClass = `${sectionBaseClass} border-t-2 border-[var(--color-tertiary)] pt-8 md:pt-12`;

  return (
    <div>
      <header className="bg-[url('/assets/img/background-1.jpg')]">
        <div className="container relative overflow-hidden">
          <img
            src="/assets/img/icone-10.svg"
            alt=""
            aria-hidden="true"
            className="hidden lg:block absolute top-20 right-8 xl:right-24 w-72 xl:w-96"
          />
          <Navbar />
          <section className="flex flex-col items-center justify-center gap-6 py-16 md:py-24 lg:py-40">
            <HeadingSecondary>Mentions légales</HeadingSecondary>
          </section>
        </div>
        <Button up={true} />
      </header>
      <main className="container flex flex-col gap-10 md:gap-12 text-[var(--color-quaternary)] text-center">
        <section className={sectionBaseClass}>
          <p className="text-xl sm:text-2xl font-bold leading-tight">
            Merci de lire avec attention les différentes modalités d’utilisation
            du présent site avant d’y parcourir ses pages.
          </p>
          <p className="border-t-2 border-[var(--color-tertiary)] pt-8 md:pt-12">
            En vous connectant sur ce site, vous acceptez, sans réserves, les
            présentes modalités. Aussi, conformément à l’article n°6 de la Loi
            n°2004-575 du 21 Juin 2004 pour la confiance dans l’économie
            numérique, les responsables du présent site Internet{" "}
            <a
              href="https://www.sanscroquettesfixes.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              sanscroquettesfixes.fr
            </a>{" "}
            sont :
          </p>
          <h4 className="text-2xl font-bold">Éditeur</h4>
          <ul className="space-y-2">
            <li>
              Association Sans Croquettes Fixes (association loi 1901 à but non
              lucratif)
            </li>
            <li>Numéro de SIRET : 81819530700017</li>
            <li>
              Responsable éditorial : Anaïs Hillion, en sa qualité de
              responsable de communication
            </li>
            <li>
              Adresse (boîte postale) : 22 chemin de Boutary 69300 Caluire et
              Cuire
            </li>
            <li>Téléphone : 06 18 25 72 38</li>
            <li>Email : contact@sanscroquettesfixes.fr</li>
            <li>
              Site Web :{" "}
              <a
                href="https://www.sanscroquettesfixes.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                sanscroquettesfixes.fr
              </a>
            </li>
          </ul>
          <h4 className="text-2xl font-bold">Hébergeur</h4>
          <ul className="space-y-2">
            <li>IONOS 1and1 Développement</li>
          </ul>
          <h4 className="text-2xl font-bold">Développeur</h4>
          <ul className="space-y-2">
            <li>
              Association Sans Croquettes Fixes (association loi 1901 à but non
              lucratif)
            </li>
            <li>Caluire et Cuire (69)</li>
            <li>
              Site Web :{" "}
              <a
                href="https://www.sanscroquettesfixes.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-primary)] hover:underline"
              >
                sanscroquettesfixes.fr
              </a>
            </li>
          </ul>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Conditions d’utilisation</h4>
          <p>
            Le présent site est proposé en différents langages web (HTML,
            Javascript, CSS, etc.) pour un meilleur confort d’utilisation et un
            graphisme plus agréable. Nous vous recommandons de recourir à des
            navigateurs modernes comme Internet Explorer, Safari, Firefox,
            Google Chrome, etc. L’association Sans Croquettes Fixes met en œuvre
            tous les moyens dont elle dispose, pour assurer une information
            fiable et une mise à jour fiable de ses sites Internet. Toutefois,
            des erreurs ou omissions peuvent survenir. L’internaute devra donc
            s’assurer de l’exactitude des informations auprès de Sans Croquettes
            Fixes, et signaler toutes modifications du site qu’il jugerait
            utile. Sans Croquettes Fixes n’est en aucun cas responsable de
            l’utilisation faite de ces informations, et de tout préjudice direct
            ou indirect pouvant en découler.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Cookies</h4>
          <p>
            Le site peut-être amené à vous demander l’acceptation des cookies
            pour des besoins de statistiques et d’affichage. Un cookie est une
            information déposée sur votre disque dur par le serveur du site que
            vous visitez. Il contient plusieurs données qui sont stockées sur
            votre ordinateur dans un simple fichier texte auquel un serveur
            accède pour lire et enregistrer des informations. Certaines parties
            de ce site ne peuvent être fonctionnelles sans l’acceptation de
            cookies.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Liens hypertextes</h4>
          <p>
            Les sites Internet peuvent offrir des liens vers d’autres sites
            Internet ou d’autres ressources disponibles sur Internet.
            L’association Sans Croquettes Fixes ne dispose d’aucun moyen pour
            contrôler les sites en connexion avec ses sites Internet. Sans
            Croquettes Fixes ne répond pas de la disponibilité de tels sites et
            sources externes, ni ne la garantit. Elle ne peut être tenue pour
            responsable de tout dommage, de quelque nature que ce soit,
            résultant du contenu de ces sites ou sources externes, et notamment
            des informations, produits ou services qu’ils proposent, ou de tout
            usage qui peut être fait de ces éléments. Les risques liés à cette
            utilisation incombent pleinement à l’internaute, qui doit se
            conformer à leurs conditions d’utilisation.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Services fournis</h4>
          <p>
            L’ensemble des activités de l’association ainsi que ses informations
            sont présentées sur notre site Internet. Sans Croquettes Fixes
            s’efforce de fournir sur son site des informations aussi précises
            que possible. Les renseignements figurant sur le site ne sont pas
            exhaustifs et les photos non contractuelles. Ils sont donnés sous
            réserve de modifications ayant été apportées depuis leur mise en
            ligne. Par ailleurs, toutes les informations indiquées sur le site
            sont données à titre indicatif, et sont susceptibles de changer ou
            d’évoluer sans préavis.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">
            Limitations contractuelles sur les données
          </h4>
          <p>
            Les informations contenues sur ce site sont aussi précises que
            possible et le site remis à jour à différentes périodes de l’année,
            mais peuvent toutefois contenir des inexactitudes ou des omissions.
            Si vous constatez une lacune, erreur ou ce qui parait être un
            dysfonctionnement, merci de bien vouloir le signaler par courriel, à
            l’adresse contact@sanscroquettesfixes.fr, en décrivant le problème
            de la manière la plus précise possible (page posant problème, type
            d’ordinateur et de navigateur utilisé, etc.). Tout contenu
            téléchargé se fait aux risques et périls de l’utilisateur et sous sa
            seule responsabilité. En conséquence, ne serait être tenu
            responsable d’un quelconque dommage subi par l’ordinateur de
            l’utilisateur ou d’une quelconque perte de données consécutives au
            téléchargement. De plus, l’utilisateur du site s’engage à accéder au
            site en utilisant un matériel récent, ne contenant pas de virus et
            avec un navigateur de dernière génération mis-à-jour. Les liens
            hypertextes mis en place dans le cadre du présent site Internet en
            direction d’autres ressources présentes sur le réseau Internet ne
            sauraient engager la responsabilité de l’association Sans Croquettes
            Fixes.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Propriété intellectuelle</h4>
          <p>
            Tout le contenu du présent site, incluant, de façon non limitative,
            les graphismes, images, textes, vidéos, animations, sons, logos,
            gifs et icônes ainsi que leur mise en forme sont la propriété
            exclusive de la société à l’exception des marques, logos ou contenus
            appartenant à d’autres sociétés partenaires ou auteurs. Toute
            reproduction, distribution, modification, adaptation, retransmission
            ou publication, même partielle, de ces différents éléments est
            strictement interdite sans l’accord exprès par écrit de
            l’association Sans Croquettes Fixes. Cette représentation ou
            reproduction, par quelque procédé que ce soit, constitue une
            contrefaçon sanctionnée par les articles L.335-2 et suivants du Code
            de la propriété intellectuelle. Le non-respect de cette interdiction
            constitue une contrefaçon pouvant engager la responsabilité civile
            et pénale du contrefacteur. En outre, les propriétaires des Contenus
            copiés pourraient intenter une action en justice à votre encontre.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Litiges</h4>
          <p>
            Les présentes conditions du site sont régies par les lois françaises
            et toute contestation ou litiges qui pourraient naître de
            l’interprétation ou de l’exécution de celles-ci seront de la
            compétence exclusive des tribunaux dont dépend le siège social de la
            société. La langue de référence, pour le règlement de contentieux
            éventuels, est le français.
          </p>
        </section>
        <section className={sectionBorderedClass}>
          <h4 className="text-2xl font-bold">Données personnelles</h4>
          <p>
            De manière générale, vous n’êtes pas tenu de nous communiquer vos
            données personnelles lorsque vous visitez notre site Internet.
            Cependant, ce principe comporte certaines exceptions. En effet, pour
            certains services proposés par notre site, vous pouvez être amenés à
            nous communiquer certaines données telles que : votre nom, votre
            fonction, le nom de votre société, votre adresse électronique, et
            votre numéro de téléphone. Tel est le cas lorsque vous remplissez le
            formulaire qui vous est proposé en ligne ou bien pour passer
            commande sur notre boutique en ligne. Dans tous les cas, vous pouvez
            refuser de fournir vos données personnelles. Dans ce cas, vous ne
            pourrez pas utiliser les services du site, notamment celui de
            solliciter des renseignements sur notre société, ou de recevoir les
            lettres d’information. Il en va de même pour la commande de produits
            via notre boutique en ligne. Enfin, nous pouvons collecter de
            manière automatique certaines informations vous concernant lors
            d’une simple navigation sur notre site Internet, notamment : des
            informations concernant l’utilisation de notre site, comme les zones
            que vous visitez et les services auxquels vous accédez, votre
            adresse IP, le type de votre navigateur, vos temps d’accès. De
            telles informations sont utilisées exclusivement à des fins de
            statistiques internes, de manière à améliorer la qualité des
            services qui vous sont proposés. Les bases de données sont protégées
            par les dispositions de la loi du 1er juillet 1998 transposant la
            directive 96/9 du 11 mars 1996 relative à la protection juridique
            des bases de données.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
