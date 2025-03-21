import { RxCross2 } from "react-icons/rx";

interface TechStackBadgeProps {
    stack: string;
    className?: string;
    showDeleteIcon?: boolean; // 삭제 아이콘 표시 여부
    onDelete?: (stack: string) => void;
}

const stackStyles: Record<string, {color: string; img: string}> = {
    "Angular": {color: "border-[#dd1b16] text-[#dd1b16]", img: "/tech_logo/angular.png"},
    "Ansible": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/ansible.png"},
    "AWS": {color: "border-[#ff9900] text-[#ff9900]", img: "/tech_logo/aws.png"},
    "Bootstrap": {color: "border-[#8312fa] text-[#8312fa]", img: "/tech_logo/bootstrap.png"},
    "Docker": {color: "border-[#1D63ED] text-[#1D63ED]", img:"/tech_logo/docker.png"},
    "DigitalOcean": {color: "border-[#0080ff] text-[#0080ff]", img:"/tech_logo/digitalocean.png"},
    "Django": {color: "border-[#092e02] text-[#092e02]", img:"/tech_logo/django.png"},
    "Elasticsearch": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Express.js": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Firebase": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Flask": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/elasticsearch.png"},
    "Google Cloud Platform": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "IBM Cloud": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Jenkins": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Kubernetes": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Microsoft Azure": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "MongoDB": {color: "border-[#00684a] text-[#00684a]", img:"/tech_logo/mongodb.png"},
    "MySQL": {color: "border-[#00758F] text-[#00758F]", img:"/tech_logo/mysql.png"},
    "Next.js": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Node.js": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Oracle Cloud": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "PostgreSQL": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "Prometheus": {color: "border-[#000000] text-[#000000]", img:"/tech_logo/googlecloud.png"},
    "React": {color: "border-[#61DAFB] text-[#61DAFB]", img: "/tech_logo/react.png"},
    "Redis": {color: "border-[#D82C20] text-[#D82C20]", img: "/tech_logo/redis.png"},
    "Ruby on Rails": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/react.png"},
    "Spring Boot": {color: "border-[#70AD51] text-[#70AD51]", img:"/tech_logo/spring.png"},
    "Svelte": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/react.png"},
    "Terraform": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/react.png"},
    "Vue.js": {color: "border-[#000000] text-[#000000]", img: "/tech_logo/react.png"},
    "Javascript": {color: "border-[#FFD600] text-[#FFD600]", img:"/tech_logo/js.png"},
    "Typescript": {color: "border-[#007ACC] text-[#007ACC]", img:"/tech_logo/ts.png"},
    "Spring": {color: "border-[#70AD51] text-[#70AD51]", img:"/tech_logo/spring.png"},
};

const TechStackBadge = ({ stack, className, showDeleteIcon=false, onDelete }: TechStackBadgeProps) => {
    const stackData = stackStyles[stack];

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();  
        e.preventDefault();   
        onDelete?.(stack);   
    };

    return (
        <span className={`inline-flex items-center h-[30px] px-[10px] text-sm/[30px] 
            rounded-full border bg-white nexon-medium ${stackData.color} ${className} ${showDeleteIcon}`}
        >
            <img src={stackData.img} alt={`${stack} icon`} className="mr-1" />
            {stack}
            {showDeleteIcon && (
                <button className="ml-1 text-black6 hover:text-black9 cursor-pointer" onClick={handleDeleteClick}><RxCross2 /></button>
            )}
        </span>
    );
};
  

export default TechStackBadge;