
//���ӤH���A��2�ӤH�ݹL�q�vA�A3�ӤH�ݹL�q�vB�A���ӤH�ݹL�q�vC

public class Algo{
	public static void main (String[] args){ 
		int num[]=new int[99];//�q�v�Ӽ�
		num[0]=0;//��K�j��
		num[1]=2;num[2]=3;num[3]=5;//num��ӹq�v���[�ݤH��,A�q�v�H��=2 B�q�v�H��=3 C�q�v�H��=5;
		//num[4]=6; �i�H�A�K�[
		int sum=0;

		for(int i=0;i<num.length;i++){
				sum=sum+num[i];//�q�v�`�[�ݤH��;
		}

		int movie[][]=new int[sum][sum];
		/*movie[0][0]=[A_1][A_1] ;movie[0][1]=[A_1][A_2]=1 movie[2][3]=[B_1][B_2]=1 movie[3][4]=[B_2][B_3]=1 �H������
		 	   [0][0]  [0][1]  [0][2]  [0][3]
		 *   |  A_1  |  A_2  |  B_1  |  B_2  |
[0][0]	  A_1|  \\\  |   1   |       |       |
[1][0]	  A_2|   1   |  \\\  |       |       |
[2][0]	  B_1|       |       |  \\\  |   1   |
[3][0]	  B_2|       |       |   1   |  \\\  | 
		  */
		int	index=0;

		
		for(int i=0;i<num.length-1;i++){//�s���ۦP�q�v  //�@�T���q�v
			index=index+num[i];
			for (int j=1;j<num[i+1];j++){//j<num[1]=2,j�|�]1��,�A����num[2]; j<num[2],j�|�]2��,�A����num[3];
				movie[index+j-1][index+j]=1;//movie[0][1]=1(A�MA�q�v�s��); movie[2][3]=1,movie[3][4]=1(B�MB�q�v�s��);
				movie[index+j][index+j-1]=1;//movie[1][0]=1(���i���i�L);
			}
		}




		System.out.println("   0 1 2 3 4 5 6 7 8 9");
		for(int i=0;i<sum;i++){
			System.out.print(i+": ");
			for(int j=0;j<sum;j++){
				System.out.print(movie[i][j] + " "); 
			}
		        System.out.println(); 
		}
	}
}
