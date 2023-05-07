'use client';

import Container from "../Container"

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Praias',
        icon: TbBeach,
        description: 'Esta propriedade fica perto da praia!'
    },
    {
        label: 'Moinhos de vento',
        icon: GiWindmill,
        description: 'Esta propriedade tem moinhos de vento!'
    },
    {
        label: 'Moderno',
        icon: MdOutlineVilla,
        description: 'Esta propriedade e moderna!'
    },
    {
        label: 'Interior',
        icon: TbMountain,
        description: 'Esta propriedade fica no campo!'
      },
      {
        label: 'Piscinas',
        icon: TbPool,
        description: 'Esta propriedade tem uma bela piscina!'
      },
      {
        label: 'Ilhas',
        icon: GiIsland,
        description: 'Esta propriedade fica em uma ilha!'
      },
      {
        label: 'Lago',
        icon: GiBoatFishing,
        description: 'Esta propriedade fica perto de um lago!'
      },
      {
        label: 'Esquiar',
        icon: FaSkiing,
        description: 'Esta propriedade tem atividades de esqui!'
      },
      {
        label: 'Castelos',
        icon: GiCastle,
        description: 'Esta propriedade é um antigo castelo!'
      },
      {
        label: 'Cavernas',
        icon: GiCaveEntrance,
        description: 'Esta propriedade fica em uma caverna assustadora!'
      },
      {
        label: 'Acampamento',
        icon: GiForestCamp,
        description: 'Esta propriedade oferece atividades de acampamento!'
      },
      {
        label: 'Ártico',
        icon: BsSnow,
        description: 'Esta propriedade está no ambiente ártico!'
      },
      {
        label: 'Deserto',
        icon: GiCactus,
        description: 'Esta propriedade fica no deserto!'
      },
      {
        label: 'Celeiros',
        icon: GiBarn,
        description: 'Esta propriedade está em um celeiro!'
      },
      {
        label: 'Luxo',
        icon: IoDiamond,
        description: 'Esta propriedade é nova e luxuosa!'
      }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null
    }


    return (
        <Container>
            <div
                className="
                    pt-4
                    flex 
                    flex-row 
                    items-center 
                    justify-between
                    overflow-x-auto
                "
            >
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    /> 
                ))}
            </div>
        </Container>
    );
}

export default Categories;